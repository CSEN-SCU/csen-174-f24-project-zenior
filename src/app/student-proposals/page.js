import { getSortedPostsData } from '/lib/posts';

export async function getStaticProps() {
  const allPostsData = getSortedPostsData();
  return {
    props: {
      allPostsData,
    },
  };
}

export default function Student(){
	return <h1>Student Proposals Page</h1>
}
