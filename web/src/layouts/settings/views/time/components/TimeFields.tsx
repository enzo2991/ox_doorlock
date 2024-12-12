import { Group, TextInput, ActionIcon, Tooltip } from '@mantine/core';
import { TbTrash } from 'react-icons/tb';
import { useStore, useSetters } from '../../../../../store';

const TimeFields: React.FC = () => {
  const time = useStore((state) => state.time);
  const setTime = useSetters((setter) => setter.setTime);

  const handleChange = (value: string | undefined, index: number, property: 'start' | 'end') => {
    setTime((prevState) => {
      return prevState.map((item, indx) => (index === indx ? { ...item, [property]: value } : item));
    });
  };

  const handleRowDelete = (index: number) => {
    setTime((prevState) => prevState.filter((obj, indx) => indx !== index));
  };

  const isValidTime = (value: string): boolean => {
    return /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/.test(value);
  };

  return (
    <>
      {time.map((field, index) => (
        <Group
          position="center"
          key={`group-${index}`}
          mt={index === 0 ? 0 : 16}
          noWrap
          spacing={16}
          sx={{ fontSize: 16 }}
        >
          <TextInput
            sx={{ width: '100%' }}
            placeholder="start"
            value={field.start as string}
            error={!isValidTime(field.start || '') && 'Invalid time format (00:00)'}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange(e.target.value, index, 'start')}
          />
          <TextInput
            sx={{ width: '100%' }}
            placeholder="end"
            value={field.end as string}
            error={!isValidTime(field.end || '') && 'Invalid time format (00:00)'}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange(e.target.value, index, 'end')}
          />
          <Tooltip label="Delete row">
            <ActionIcon color="red.4" variant="transparent" onClick={() => handleRowDelete(index)}>
              <TbTrash size={24} />
            </ActionIcon>
          </Tooltip>
        </Group>
      ))}
    </>
  );
};

export default TimeFields;
