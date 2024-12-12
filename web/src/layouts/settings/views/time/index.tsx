import { useEffect } from 'react';
import { useSetters } from '../../../../store';
import TimeFields from './components/TimeFields';
import Layout from '../../Layout';

const Time: React.FC = () => {
  const setTime = useSetters((setter) => setter.setTime);

  // Remove empty fields on unmount
  useEffect(() => {
    return () => {
      setTime((prevState) =>
        prevState.filter((item, index) => item.start !== '' || item.end !== '' ||  index === 0)
      );
    };
  }, []);

  return (
    <Layout setter={() => setTime((prevState) => [...prevState, { start: '', end: '' }])}>
      <TimeFields />
    </Layout>
  );
};

export default Time;