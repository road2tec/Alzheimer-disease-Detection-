import subprocess

def get_git_objects():
    # Get all objects
    rev_list = subprocess.check_output(['git', 'rev-list', '--objects', '--all']).decode('utf-8').splitlines()
    objects = []
    for line in rev_list:
        parts = line.split(' ', 1)
        sha = parts[0]
        name = parts[1] if len(parts) > 1 else "tree/blob"
        objects.append((sha, name))
    return objects

def check_size(objects):
    large_files = []
    # Batch check sizes
    # properly format input for batch-check
    input_str = '\n'.join([obj[0] for obj in objects])
    
    proc = subprocess.Popen(['git', 'cat-file', '--batch-check=%(objectname) %(objectsize)'], 
                            stdin=subprocess.PIPE, stdout=subprocess.PIPE, stderr=subprocess.PIPE, text=True)
    stdout, stderr = proc.communicate(input=input_str)
    
    sizes = {}
    for line in stdout.splitlines():
        parts = line.split()
        if len(parts) >= 2:
            sizes[parts[0]] = int(parts[1])
            
    for sha, name in objects:
        if sha in sizes and sizes[sha] > 10 * 1024 * 1024: # > 10MB
            large_files.append((sha, name, sizes[sha]))
            
    return large_files

objs = get_git_objects()
large = check_size(objs)

print("Large objects found:")
for sha, name, size in large:
    print(f"{size/1024/1024:.2f} MB - {sha} - {name}")
