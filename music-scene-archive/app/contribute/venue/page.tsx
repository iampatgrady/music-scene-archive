import GenericCRUD from '../../components/GenericCRUD';

export default function ContributeBandPage() {
  return <GenericCRUD collectionName="venue" />;
}
  
  export const metadata = {
    title: 'Add Venue - Music Scene Archive',
    description: 'Add a new venue to the archive.',
  };