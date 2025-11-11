const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..', 'json', 'projects-data.json');
const raw = fs.readFileSync(filePath, 'utf8');
const data = JSON.parse(raw);

const categoryMap = {
  1: 'Web Development',
  2: 'Video Editing',
  3: 'Mobile',
  9: 'Other',
  10: 'All'
};

let changed = 0;
if (Array.isArray(data.Projects)) {
  data.Projects.forEach((p) => {
    if (Array.isArray(p.category) && p.category.length > 0) {
      const names = p.category.map(id => categoryMap[id] || `Cat ${id}`).filter(Boolean);
      const newRight = names.join(', ');
      if (p.right !== newRight) {
        p.right = newRight;
        changed++;
      }
    }
  });
}

fs.writeFileSync(filePath, JSON.stringify(data, null, 2) + '\n', 'utf8');
console.log(`Updated ${changed} project(s). File: ${filePath}`);
