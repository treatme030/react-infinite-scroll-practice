import React, { useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import EndMessage from './components/EndMessage';
import Comment from './components/Comment';

function App() {
  const [items, setItems] = useState([]);
  const [page, setPage] = useState(2);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    const getComments = async () => {
      const res = await fetch(
        `https://jsonplaceholder.typicode.com/comments?_page=1&_limit=20`
        );
      const data = await res.json();
      setItems(data);
    }
    getComments();
  },[])

  const fetchComments = async () => {
    const res = await fetch(
      `https://jsonplaceholder.typicode.com/comments?_page=${page}&_limit=20`
    );
    const data = await res.json();
    return data;
  };

  const fetchData = async () => {
    const commentsFromServer = await fetchComments();
    setItems([
      ...items,
      ...commentsFromServer
    ])
    if(commentsFromServer.length === 0 || commentsFromServer.length < 20){
      setHasMore(false);
    }
    setPage(page + 1);
  }

  return (
    <InfiniteScroll
      dataLength={items.length}
      next={fetchData}
      hasMore={hasMore}
      loader={<h4>Loading...</h4>}
      endMessage={<EndMessage/>}
    >
      <div className="container">
        { items.map(item => {
          return <Comment key={item.id} item={item} />
        })}
      </div>
    </InfiniteScroll>
  );
}

export default App;
