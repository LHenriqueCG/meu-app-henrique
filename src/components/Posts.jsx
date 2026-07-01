import { useState, useEffect }
  from 'react';

function Posts() {
  const [posts, setPosts] =
    useState([]);

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/posts')
      .then(r => r.json())
      .then(d => setPosts(d));
  }, []); // [] = executa 1 vez

  return (
    <ul>
      {posts.slice(0, 5).map(p => (
        <li key={p.id}>
          {p.title}
        </li>
      ))}
    </ul>
  );
}

export default Posts;