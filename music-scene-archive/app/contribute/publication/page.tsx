import GenericCRUD from '../../components/GenericCRUD';

export default function ContributeBandPage() {
  return <GenericCRUD collectionName="publication" />;
}
  
  export const metadata = {
    title: 'Add Publication - Music Scene Archive',
    description: 'Add a new publication to the archive.',
  };