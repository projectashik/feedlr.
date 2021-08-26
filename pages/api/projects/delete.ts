import {
  getSession,
  UserProfile,
  withApiAuthRequired,
} from '@auth0/nextjs-auth0';
import { NextApiRequest, NextApiResponse } from 'next';
import prisma from 'utils/prisma';

async function deleteProject(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'DELETE') {
    const { id } = req.body;
    // @ts-ignore
    const { user }: { user: UserProfile } = getSession(req, res);
    try {
      const response = await prisma.project.findFirst({
        where: {
          id: id,
          // @ts-ignore
          userId: user.sub,
        },
      });

      if (response) {
        try {
          await prisma.response.deleteMany({
            where: {
              projectId: id,
            },
          });

          try {
            const settingRes = await prisma.setting.findFirst({
              where: {
                projectId: id,
              },
            });
            if (settingRes) {
              await prisma.setting.delete({
                where: {
                  projectId: id,
                },
              });
            }
            try {
              const response = await prisma.project.delete({
                where: {
                  id,
                },
              });

              res.json({
                success: true,
              });
            } catch (error) {
              res.json({
                success: false,
                error: error.message,
              });
            }
          } catch (error) {
            console.log(error);
            res.json({
              success: false,
              error: error.message,
            });
          }
        } catch (error) {
          console.log(error);
          res.json({
            success: false,
            error: error.message,
          });
        }
      } else {
        res.status(404).json({
          success: false,
          error: 'Data not found',
        });
      }
    } catch (error) {
      console.log(error);
      res.json({
        success: false,
        error: error.message,
      });
    }
  } else {
    res.json({
      success: false,
      error: 'Invalid request method',
    });
  }
}

export default withApiAuthRequired(deleteProject);
