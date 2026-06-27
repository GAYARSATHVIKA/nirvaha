import re, json

with open(r'C:\Users\chara\.gemini\antigravity-ide\brain\a48149fc-f051-4284-81be-e0a51b8d6d93\.system_generated\steps\90\content.md', 'r', encoding='utf-8') as f:
    text = f.read()

modules = []
current_module = None
current_unit = None

lines = text.split('\n')
i = 0
while i < len(lines):
    line = lines[i].strip()
    
    if line.startswith('Module ') and 'Quiz' not in line and '—' not in line:
        try:
            mod_num = line.split(' ')[1]
            i += 1
            mod_title = lines[i].strip()
            i += 1
            mod_goal = ''
            if lines[i].strip() == 'Module Goal':
                i += 1
                mod_goal = lines[i].strip()
            current_module = {
                'id': f'dmml-m{mod_num}',
                'title': f'Module {mod_num}: {mod_title}',
                'description': mod_goal,
                'units': []
            }
            modules.append(current_module)
        except Exception:
            pass
    elif line.startswith('Section '):
        sec_num = line.split(' ')[1]
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
        while i < len(lines) and not lines[i].startswith('Section ') and not lines[i].startswith('Module ') and not lines[i].startswith('Final Assessment'):
            l = lines[i].strip()
            if l and l != '_' * 16:
                if l.startswith('A useful rule:') or l.startswith('A useful principle:'):
                    i += 1
                    current_unit['content']['summary'] = lines[i].strip()
                else:
                    current_unit['content']['body'].append(l)
            i += 1
        continue
    elif line.startswith('Module ') and 'Quiz' in line:
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
        while i < len(lines) and not lines[i].startswith('Module ') and not lines[i].startswith('Final Assessment'):
            l = lines[i].strip()
            if l.startswith('Question '):
                q = {'question': lines[i+1].strip(), 'options': [], 'correct': 0}
                i += 2
                while i < len(lines) and lines[i].strip().startswith(('A.', 'B.', 'C.', 'D.')):
                    opt = lines[i].strip()[3:].strip()
                    q['options'].append(opt)
                    i += 1
                if lines[i].strip().startswith('Correct Answer:'):
                    ans = lines[i].strip().split(': ')[1].strip()
                    q['correct'] = ord(ans) - 65
                current_unit['content']['quizQuestions'].append(q)
            i += 1
        continue
    elif line.startswith('Final Assessment Questions'):
        current_module = {
            'id': 'dmml-final',
            'title': 'Final Assessment',
            'description': 'Final Assessment for Digital Mindfulness',
            'units': []
        }
        modules.append(current_module)
        current_unit = {
            'id': 'dmml-final-q',
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
                q_text = lines[i+1].strip()
                i += 2
                if not lines[i].strip().startswith(('A.', 'B.', 'C.', 'D.')):
                    q_text += ' ' + lines[i].strip()
                    i += 1
                q = {'question': q_text, 'options': [], 'correct': 0}
                while i < len(lines) and lines[i].strip().startswith(('A.', 'B.', 'C.', 'D.')):
                    opt = lines[i].strip()[3:].strip()
                    q['options'].append(opt)
                    i += 1
                if lines[i].strip().startswith('Correct Answer:'):
                    ans = lines[i].strip().split(': ')[1].strip()
                    q['correct'] = ord(ans) - 65
                current_unit['content']['quizQuestions'].append(q)
            i += 1
        continue
    
    i += 1

with open('parsed_modules.json', 'w', encoding='utf-8') as f:
    json.dump(modules, f, indent=2)
