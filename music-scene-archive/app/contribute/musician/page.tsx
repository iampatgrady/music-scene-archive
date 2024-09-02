import GenericCRUD from '../../components/GenericCRUD';

export default function ContributeBandPage() {
  return <GenericCRUD collectionName="musician" />;
}
  
  export const metadata = {
    title: 'Add Musician - Music Scene Archive',
    description: 'Add a new musician to the archive.',
  };