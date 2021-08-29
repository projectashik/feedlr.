import { ProjectLayout } from 'layouts';
import { useRouter } from 'next/router';
import { Card, Typography, Input } from 'components/ui';
import useSWR from 'swr';
import { Project } from '@prisma/client';

export default function InstallationSettingsPage() {
  const router = useRouter();
  const { id } = router.query;
  const { data: project, error: projectError } = useSWR<Project>(
    `/api/projects/get?id=${id}`
  );
  if (!project) return 'Loading...';

  return (
    <>
      <ProjectLayout id={id}>
        Installations
        <Card className='mt-2'>
          <p>
            <Typography.Text strong>For Production</Typography.Text>
          </p>
          <Typography.Text>
            Add the following script to your head tag. Then Feedlr. will show
            widget to your site
          </Typography.Text>
          <Input
            disabled
            className='mt-3 '
            inputClass='py-3 dark:bg-gray-800'
            copy
            value={`<script src="${window.location.origin}/init.js"></script>`}
          />
        </Card>
        <Card className='mt-2'>
          <p>
            <Typography.Text strong>For localhost</Typography.Text>
          </p>
          <Typography.Text>
            Add the following script to your head tag. Then Feedlr. will show
            widget to your site
          </Typography.Text>
          <Input
            disabled
            className='mt-3 '
            inputClass='py-3 dark:bg-gray-800'
            copy
            value={`<script src="${window.location.origin}/init.js" data-feedlr-project-id="${project?.id}"></script>`}
          />
        </Card>
        <div className='mt-4'>
          <Typography.Text>Options</Typography.Text>
          <Card>
            <Typography.Text>
              Add the following options to script tag to use.
            </Typography.Text>
            <table className='table-auto divide-y divide-gray-200 min-w-full mt-4'>
              <thead className='bg-gray-50 dark:bg-gray-600'>
                <tr>
                  <th className='text-left'>Option</th>
                  <th className='text-left'>Default</th>
                  <th className='text-left'>Description</th>
                  <th className='text-left'>Usage</th>
                </tr>
              </thead>
              <tbody className='divide-y divide-gray-200'>
                <tr>
                  <td>
                    <code>data-position-right</code>
                  </td>
                  <td>10</td>
                  <td>How much you want to move widget from right.</td>
                  <td className='overflow-hidden'>
                    <code>
                      <pre className='w-64 overflow-x-auto'>
                        &lt;script data-position-right=&apos;20&apos; src=&apos;
                        {window.location.origin}
                        /init.js&apos;&gt;&lt;/script&gt;
                      </pre>
                    </code>
                  </td>
                </tr>
                <tr>
                  <td>
                    <code>data-position-bottom</code>
                  </td>
                  <td>10</td>
                  <td>How much you want to move widget from bottom.</td>
                  <td className='overflow-hidden'>
                    <code>
                      <pre className='w-64 overflow-x-auto'>
                        &lt;script data-position-bottom=&apos;20&apos;
                        src=&apos;
                        {window.location.origin}
                        /init.js&apos;&gt;&lt;/script&gt;
                      </pre>
                    </code>
                  </td>
                </tr>

                <tr>
                  <td>
                    <code>data-input-style</code>
                  </td>
                  <td>-</td>
                  <td>Change the default style of email and feedback field.</td>
                  <td className='overflow-hidden'>
                    <code>
                      <pre className='w-64 overflow-x-auto'>
                        &lt;script
                        data-input-styele=&apos;border-radius:10%&apos;
                        src=&apos;
                        {window.location.origin}
                        /init.js&apos;&gt;&lt;/script&gt;
                      </pre>
                    </code>
                  </td>
                </tr>

                <tr>
                  <td>
                    <code>data-toggler-style</code>
                  </td>
                  <td>-</td>
                  <td>Override the default style of toggler button.</td>
                  <td className='overflow-hidden'>
                    <code>
                      <pre className='w-64 overflow-x-auto'>
                        &lt;script data-position-right=&apos;20&apos; src=&apos;
                        {window.location.origin}
                        /init.js&apos;&gt;&lt;/script&gt;
                      </pre>
                    </code>
                  </td>
                </tr>

                <tr>
                  <td>
                    <code>data-mode</code>
                  </td>
                  <td>-</td>
                  <td>Enable Dark Mode In the widget</td>
                  <td className='overflow-hidden'>
                    <code>
                      <pre className='w-64 overflow-x-auto'>
                        &lt;script data-mode=&apos;dark&apos; src=&apos;
                        {window.location.origin}
                        /init.js&apos;&gt;&lt;/script&gt;
                      </pre>
                    </code>
                  </td>
                </tr>
                <tr>
                  <td>
                    <code>data-submit-style</code>
                  </td>
                  <td>-</td>
                  <td>Change the look of submit button as you want</td>
                  <td className='overflow-hidden'>
                    <code>
                      <pre className='w-64 overflow-x-auto'>
                        &lt;script
                        data-submit-style=&apos;border-radius:50%;&apos;
                        src=&apos;
                        {window.location.origin}
                        /init.js&apos;&gt;&lt;/script&gt;
                      </pre>
                    </code>
                  </td>
                </tr>
              </tbody>
            </table>
          </Card>
        </div>
      </ProjectLayout>
    </>
    // <>Installation</>
  );
}
