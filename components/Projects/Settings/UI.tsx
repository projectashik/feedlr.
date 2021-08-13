import { Typography, Card, Input, Button } from 'components/ui';
export const UISettingsComponent = () => {
  return (
    <>
      <section id='UI' className='mt-4'>
        <Typography.Title level={4} className='font-bold'>
          UI
        </Typography.Title>
        <Card className='mt-4'>
          <form action='' className=''>
            <div className='grid grid-cols-2 gap-4'>
              <div>
                <Typography.Text>Light Mode</Typography.Text>
                <div className='border rounded dark:border-gray-600 p-2 grid gap-3 mt-2'>
                  <Input
                    icon='#'
                    placeholder='Color Hex Code'
                    label='Background'
                  />
                  <Input
                    icon='#'
                    placeholder='Color Hex Code'
                    label='Button Color'
                  />
                  <Input
                    icon='#'
                    placeholder='Color Hex Code'
                    label='Text Color'
                  ></Input>
                </div>
              </div>
              <div>
                <Typography.Text>Dark Mode</Typography.Text>
                <div className='border rounded dark:border-gray-600 p-2 grid gap-3 mt-2'>
                  <Input
                    icon='#'
                    placeholder='Color Hex Code'
                    label='Background'
                  />
                  <Input
                    icon='#'
                    placeholder='Color Hex Code'
                    label='Button Color'
                  />
                  <Input
                    icon='#'
                    placeholder='Color Hex Code'
                    label='Text Color'
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
