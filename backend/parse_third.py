import re, json

with open(r'c:\Users\chara\nirvaha\backend\third_doc.txt', 'r', encoding='utf-8-sig') as f:
    text = f.read()

modules = []
current_module = None
current_unit = None

lines = text.split('\n')
# In third_doc.txt, the content starts right at the beginning
start_idx = 0
for i, line in enumerate(lines):
    if line.strip() == 'Module 1':
        start_idx = i
        break

lines = lines[start_idx:]

i = 0
while i < len(lines):
    line = lines[i].strip()
    
    if line.startswith('Module ') and 'Quiz' not in line and '—' not in line:
            mod_num = line.split(' ')[1]
            i += 1
            mod_title = lines[i].strip()
            i += 1
            
            # In third_doc.txt, sometimes there are empty lines before Module Goal
            while i < len(lines) and not lines[i].strip():
                i += 1
            
            mod_goal = ''
            if i < len(lines) and lines[i].strip() == 'Module Goal':
                i += 1
                while i < len(lines) and not lines[i].strip():
                    i += 1
                mod_goal = lines[i].strip()
                i += 1
            
            current_module = {
                'id': f'fcc-m{mod_num}',
                'title': f'Module {mod_num}: {mod_title}',
                'description': mod_goal,
                'units': []
            }
            modules.append(current_module)
    elif line.startswith('Section '):
        sec_num = line.split(' ')[1]
        i += 1
        while i < len(lines) and not lines[i].strip():
            i += 1
        sec_title = lines[i].strip()
        current_unit = {
            'id': f"{current_module['id']}-{sec_num}",
            'title': sec_title,
            'type': 'reading',
            'xp': 50,
            'duration': '5 min',
            'content': {
                'body': [],
                'summary': ''
            }
        }
        current_module['units'].append(current_unit)
        i += 1
        while i < len(lines) and not lines[i].startswith('Section ') and not lines[i].startswith('Module ') and not lines[i].startswith('Quiz — Module') and not lines[i].startswith('Example Final Assessment'):
            l = lines[i].strip()
            if l and l != '_' * 16:
                if l.startswith('A useful rule:') or l.startswith('A simple rule to remember:') or l.startswith('A simple guideline:') or l.startswith('A simple tip:') or l.startswith('A useful rule for speaking clearly is:') or l.startswith('A useful rule to remember:') or l.startswith('Remember:') or l.startswith('A simple technique:'):
                    i += 1
                    while i < len(lines) and not lines[i].strip():
                        i += 1
                    current_unit['content']['summary'] = lines[i].strip()
                elif l.startswith('A simple principle:') or l.startswith('A simple rule:'):
                    i += 1
                    while i < len(lines) and not lines[i].strip():
                        i += 1
                    current_unit['content']['summary'] = lines[i].strip()
                else:
                    current_unit['content']['body'].append(l)
            i += 1
        continue
    elif (line.startswith('Module ') and 'Quiz' in line) or line.startswith('Quiz — Module'):
        current_unit = {
            'id': f"{current_module['id']}-q",
            'title': line,
            'type': 'quiz',
            'xp': 50,
            'duration': '5 min',
            'content': {
                'quizQuestions': []
            }
        }
        current_module['units'].append(current_unit)
        i += 1
        while i < len(lines) and not lines[i].startswith('Module ') and not lines[i].startswith('Example Final Assessment'):
            l = lines[i].strip()
            if l.startswith('Question '):
                while i + 1 < len(lines) and not lines[i+1].strip():
                    i += 1
                q_text = lines[i+1].strip()
                i += 2
                while i < len(lines) and not lines[i].strip().startswith(('A.', 'B.', 'C.', 'D.')):
                    if lines[i].strip():
                        q_text += '\n' + lines[i].strip()
                    i += 1
                q = {'question': q_text, 'options': [], 'correct': 0}
                while i < len(lines) and lines[i].strip().startswith(('A.', 'B.', 'C.', 'D.')):
                    opt = lines[i].strip()[3:].strip()
                    q['options'].append(opt)
                    i += 1
                while i < len(lines) and not lines[i].strip():
                    i += 1
                if i < len(lines) and lines[i].strip().startswith('Correct Answer:'):
                    ans = lines[i].strip().split(': ')[1].strip()
                    q['correct'] = ord(ans) - 65
                current_unit['content']['quizQuestions'].append(q)
            i += 1
        continue
    elif line.startswith('Example Final Assessment Questions') or line.startswith('Final Assessment Questions'):
        current_module = {
            'id': 'fcc-final',
            'title': 'Final Assessment',
            'description': 'Final Assessment for Foundations of Clear Communication',
            'units': []
        }
        modules.append(current_module)
        current_unit = {
            'id': 'fcc-final-q',
            'title': 'Final Quiz',
            'type': 'quiz',
            'xp': 100,
            'duration': '20 min',
            'content': {
                'quizQuestions': []
            }
        }
        current_module['units'].append(current_unit)
        i += 1
        while i < len(lines):
            l = lines[i].strip()
            if l.startswith('Question '):
                while i + 1 < len(lines) and not lines[i+1].strip():
                    i += 1
                q_text = lines[i+1].strip()
                i += 2
                while i < len(lines) and not lines[i].strip().startswith(('A.', 'B.', 'C.', 'D.')):
                    if lines[i].strip():
                        q_text += '\n' + lines[i].strip()
                    i += 1
                q = {'question': q_text, 'options': [], 'correct': 0}
                while i < len(lines) and lines[i].strip().startswith(('A.', 'B.', 'C.', 'D.')):
                    opt = lines[i].strip()[3:].strip()
                    q['options'].append(opt)
                    i += 1
                while i < len(lines) and not lines[i].strip():
                    i += 1
                if i < len(lines) and lines[i].strip().startswith('Correct Answer:'):
                    ans = lines[i].strip().split(': ')[1].strip()
                    q['correct'] = ord(ans) - 65
                current_unit['content']['quizQuestions'].append(q)
            i += 1
        continue
    
    i += 1

with open('parsed_modules_fcc.json', 'w', encoding='utf-8') as f:
    json.dump(modules, f, indent=2)

print("Saved parsed_modules_fcc.json")
