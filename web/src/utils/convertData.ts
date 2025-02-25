import { DoorColumn } from '../store/doors';
import { StoreState, StringField } from '../store';

// Converts groups data into array format
export const convertData = (data: DoorColumn) => {
  let newGroupsData: { name: string; grade: number }[] = [];
  if (data.groups) {
    const doorGroupsData = Object.entries(data.groups);
    for (let i = 0; i < doorGroupsData.length; i++) {
      const groupObj = doorGroupsData[i];
      newGroupsData[i] = { name: groupObj[0], grade: groupObj[1] };
    }
  }

  let newTimeData: { start: StringField; end: StringField }[] = [];
  if (data.time && Array.isArray(data.time)) {
    newTimeData = data.time;
  } else {
    newTimeData = []; // ✅ Valeur par défaut si `time` est incorrect
  }
  return {
    ...data,
    characters: data.characters || [''],
    groups: [...newGroupsData],
    items: data.items || [{ name: '', metadata: '', remove: false }],
    lockpickDifficulty: data.lockpickDifficulty || [''],
    time:newTimeData,
  } as StoreState;
};
