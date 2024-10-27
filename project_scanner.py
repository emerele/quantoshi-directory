#!/usr/bin/env python3
import os
import json
from datetime import datetime
from typing import Dict, List, Optional
import argparse
from pathlib import Path
import fnmatch

class ProjectScanner:
    def __init__(self,
                 ignore_patterns: List[str] = None,
                 include_metadata: bool = True,
                 max_file_size_mb: float = 10.0):
        """
        Initialize the project scanner with configuration options.

        Args:
            ignore_patterns: List of glob patterns to ignore (e.g., ['.git/*', '*.pyc'])
            include_metadata: Whether to include file metadata like size and dates
            max_file_size_mb: Maximum file size to process in MB
        """
        self.ignore_patterns = ignore_patterns or [
            '.git/*',
            '__pycache__/*',
            '*.pyc',
            'venv/*',
            'node_modules/*',
            '.env',
            '*.log'
        ]
        self.include_metadata = include_metadata
        self.max_file_size_bytes = max_file_size_mb * 1024 * 1024

    def should_ignore(self, path: str) -> bool:
        """Check if the path should be ignored based on ignore patterns."""
        return any(fnmatch.fnmatch(path, pattern) for pattern in self.ignore_patterns)

    def get_file_metadata(self, file_path: Path) -> Dict:
        """Get metadata for a file."""
        stat = file_path.stat()
        return {
            'size_bytes': stat.st_size,
            'last_modified': datetime.fromtimestamp(stat.st_mtime).isoformat(),
            'created': datetime.fromtimestamp(stat.st_ctime).isoformat(),
            'is_binary': self._is_binary_file(file_path)
        }

    def _is_binary_file(self, file_path: Path) -> bool:
        """Check if a file is binary."""
        try:
            with open(file_path, 'tr') as f:
                f.read(1024)
                return False
        except UnicodeDecodeError:
            return True

    def get_file_info(self, file_path: Path) -> Dict:
        """Get information about a single file."""
        info = {
            'name': file_path.name,
            'type': 'file',
            'extension': file_path.suffix.lower()[1:] if file_path.suffix else None,
            'relative_path': str(file_path)
        }

        if self.include_metadata:
            info['metadata'] = self.get_file_metadata(file_path)

        return info

    def scan_directory(self, start_path: str = '.') -> Dict:
        """
        Scan the directory and create a JSON representation of its structure.

        Args:
            start_path: The root directory to start scanning from

        Returns:
            Dict containing the directory structure
        """
        start_path = Path(start_path)

        def scan_recursive(current_path: Path) -> Dict:
            structure = {
                'name': current_path.name or str(current_path),
                'type': 'directory',
                'contents': []
            }

            try:
                for item in current_path.iterdir():
                    relative_path = str(item.relative_to(start_path))

                    if self.should_ignore(relative_path):
                        continue

                    if item.is_file():
                        if item.stat().st_size > self.max_file_size_bytes:
                            continue
                        structure['contents'].append(self.get_file_info(item))
                    elif item.is_dir():
                        structure['contents'].append(scan_recursive(item))

                # Sort contents by name
                structure['contents'].sort(key=lambda x: x['name'])

            except PermissionError:
                structure['error'] = 'Permission denied'

            return structure

        result = scan_recursive(start_path)
        result['scan_metadata'] = {
            'timestamp': datetime.now().isoformat(),
            'ignore_patterns': self.ignore_patterns,
            'root_directory': str(start_path.absolute())
        }

        return result

def main():
    parser = argparse.ArgumentParser(description='Generate a JSON representation of a project structure.')
    parser.add_argument('--path', '-p', default='.', help='Path to scan (default: current directory)')
    parser.add_argument('--output', '-o', default='project_structure.json', help='Output JSON file')
    parser.add_argument('--ignore', '-i', action='append', help='Additional ignore patterns')
    parser.add_argument('--no-metadata', action='store_true', help='Exclude file metadata')
    parser.add_argument('--max-size', type=float, default=10.0, help='Maximum file size in MB')

    args = parser.parse_args()

    # Combine default ignore patterns with user-provided ones
    ignore_patterns = ['.git/*', '__pycache__/*', '*.pyc', 'venv/*', 'node_modules/*']
    if args.ignore:
        ignore_patterns.extend(args.ignore)

    scanner = ProjectScanner(
        ignore_patterns=ignore_patterns,
        include_metadata=not args.no_metadata,
        max_file_size_mb=args.max_size
    )

    structure = scanner.scan_directory(args.path)

    with open(args.output, 'w', encoding='utf-8') as f:
        json.dump(structure, f, indent=2, ensure_ascii=False)

    print(f"Project structure has been saved to {args.output}")

if __name__ == '__main__':
    main()
