import { UserProfile, withPageAuthRequired } from '@auth0/nextjs-auth0';
import { Avatar, Button, Typography, Card } from 'components/ui';
import { AuthLayout } from 'layouts';
import { useRouter } from 'next/router';
import { FiLogOut } from 'react-icons/fi';

function ProfilePage({ user }: { user: UserProfile }) {
  const router = useRouter();
  const logout = () => {
    router.push('/api/auth/logout');
  };
  return (
    <AuthLayout>
      <div className=''>
        <Card className='flex justify-between'>
          <div className='flex'>
            <Avatar width='100' height='100' src={user && user?.picture} />
            <div className='flex flex-col justify-center ml-4'>
              <Typography.Title level={3}>{user?.name}</Typography.Title>
              <Typography.Text>{user?.email}</Typography.Text>
            </div>
          </div>
          <div className='flex items-center'>
            <Button danger type='primary' onClick={logout} icon={<FiLogOut />}>
              Logout
            </Button>
          </div>
        </Card>
      </div>
    </AuthLayout>
  );
}

export default withPageAuthRequired(ProfilePage);
