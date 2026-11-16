import {test} from 'node:test';
import assert from 'node:assert/strict';
import {retrospectiveDate, archiveDateLabel, postOrder} from '../scripts/blog-dates.mjs';
test('strict retrospective dates reject invalid days and ambiguous input',()=>{assert.equal(retrospectiveDate(''),null);for(const date of ['2025-02-30','2025-13-01','01/02/2025'])assert.throws(()=>retrospectiveDate(date));});
test('week labels do not drift with the machine timezone',()=>{assert.equal(archiveDateLabel(retrospectiveDate('2024-12-30')),'Dec 30, 2024');});
test('retrospective chronology is independent of actual publication date',()=>{const actual=new Date('2026-11-16');const a={date:actual,retrospective:retrospectiveDate('2024-12-30')};const b={date:actual,retrospective:retrospectiveDate('2025-01-06')};assert.deepEqual([a,b].sort(postOrder),[b,a]);assert.equal(a.date.toISOString().slice(0,10),'2026-11-16');});
test('ordinary posts retain publication chronology',()=>{assert.ok(postOrder({date:new Date('2025-01-01')},{date:new Date('2026-01-01')})>0);});
