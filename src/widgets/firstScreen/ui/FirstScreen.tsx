import { IMacBox } from '../../../entities/iMacBox';
import { TitleText } from '../../../entities/TitleText';
import { useState } from 'react';

const FirstScreen = () => {
  const [textVisible, setTextVisible] = useState(false);

  return (
    <div
      style={{
        position: 'relative',
      }}
    >
      <TitleText visible={textVisible} />
      <IMacBox
        setTextVisible={setTextVisible}
        visible={textVisible}
      />
    </div>
  );
};

export default FirstScreen;
