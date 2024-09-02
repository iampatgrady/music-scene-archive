export default function ContributePage() {
    return (
      <>
        <h1>Contribute</h1>
        <p>Add information to the music scene archive.</p>
        <ul>
          <li>
            <a href="/contribute/band">Add Band</a>
          </li>
          <li>
            <a href="/contribute/musician">Add Musician</a>
          </li>
          <li>
            <a href="/contribute/venue">Add Venue</a>
          </li>
          <li>
            <a href="/contribute/show">Add Show</a>
          </li>
          <li>
            <a href="/contribute/publication">Add Publication</a>
          </li>
        </ul>
      </>
    );
  }
  
  export const metadata = {
    title: 'Contribute - Music Scene Archive',
    description: 'Contribute to the music scene archive.',
  };