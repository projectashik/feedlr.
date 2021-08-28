import axios from 'axios';
import { Typography, Card, Input, Button } from 'components/ui';
import { BaseSyntheticEvent } from 'react';
import { useState } from 'react';
import toast from 'react-hot-toast';
export const UISettingsComponent = ({ project }: any) => {
  const [lightModeBackground, setLightModeBackground] = useState(
    project?.setting ? project?.setting.lightModeBackground : 'ffffff'
  );
  const [darkModeBackground, setDarkModeBackground] = useState(
    project?.setting ? project?.setting.darkModeBackground : '0F0F0F'
  );
  const [lightModeTextColor, setLightModeTextColor] = useState(
    project?.setting ? project?.setting.lightModeTextColor : '000000'
  );
  const [lightModeButtonColor, setLightModeButtonColor] = useState(
    project?.setting ? project?.setting.lightModeButtonColor : '9261DF'
  );
  const [darkModeTextColor, setDarkModeTextColor] = useState(
    project?.setting ? project?.setting.darkModeTextColor : 'ffffff'
  );
  const [darkModeButtonColor, setDarkModeButtonColor] = useState(
    project?.setting ? project?.setting.darkModeButtonColor : '9261DF'
  );

  const saveSetting = async () => {
    return await axios.post('/api/projects/settings/ui', {
      lightModeBackground,
      lightModeButtonColor,
      lightModeTextColor,
      darkModeBackground,
      darkModeButtonColor,
      darkModeTextColor,
      projectId: project.id,
    });
  };

  const onSubmit = (e: BaseSyntheticEvent) => {
    e.preventDefault();
    toast.promise(saveSetting(), {
      loading: 'Saving...',
      success: <b>Settings saved!</b>,
      error: <b>Could not save.</b>,
    });
  };
  return (
    <>
      <section id='UI' className='mt-4'>
        <Typography.Title level={4} className='font-bold'>
          UI
        </Typography.Title>
        <Card className='mt-4'>
          <form onSubmit={onSubmit} className=''>
            <div className='grid grid-cols-2 gap-4'>
              <div>
                <Typography.Text>Light Mode</Typography.Text>
                <div className='border rounded dark:border-gray-600 p-4 grid gap-3 mt-2'>
                  <Input
                    icon='#'
                    placeholder='Color Hex Code'
                    label='Background'
                    value={lightModeBackground}
                    onChange={(e) => {
                      setLightModeBackground(e.target.value);
                    }}
                  />
                  <Input
                    icon='#'
                    placeholder='Color Hex Code'
                    label='Button Bg Color'
                    value={lightModeButtonColor}
                    onChange={(e) => {
                      setLightModeButtonColor(e.target.value);
                    }}
                  />
                  <Input
                    icon='#'
                    placeholder='Color Hex Code'
                    label='Text Color'
                    value={lightModeTextColor}
                    onChange={(e) => {
                      setLightModeTextColor(e.target.value);
                    }}
                  ></Input>
                </div>
              </div>
              <div>
                <Typography.Text>Dark Mode</Typography.Text>
                <div className='border rounded dark:border-gray-600 p-4 grid gap-3 mt-2'>
                  <Input
                    icon='#'
                    placeholder='Color Hex Code'
                    label='Background'
                    value={darkModeBackground}
                    onChange={(e) => {
                      setDarkModeBackground(e.target.value);
                    }}
                  />
                  <Input
                    icon='#'
                    placeholder='Color Hex Code'
                    label='Button Bg Color'
                    value={darkModeButtonColor}
                    onChange={(e) => {
                      setDarkModeButtonColor(e.target.value);
                    }}
                  />
                  <Input
                    icon='#'
                    placeholder='Color Hex Code'
                    label='Text Color'
                    value={darkModeTextColor}
                    onChange={(e) => {
                      setDarkModeTextColor(e.target.value);
                    }}
                  ></Input>
                </div>
              </div>
            </div>
            <div className='mt-4 flex justify-end'>
              <Button type='primary'>Save</Button>
            </div>
          </form>
        </Card>
      </section>
    </>
  );
};
