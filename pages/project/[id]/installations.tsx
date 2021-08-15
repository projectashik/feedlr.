import { ProjectLayout } from 'layouts';
import { useRouter } from 'next/router';

export default function InstallationSettingsPage() {
  const router = useRouter();
  const { id } = router.query;
  return <ProjectLayout id={id}>Installations</ProjectLayout>;
}
