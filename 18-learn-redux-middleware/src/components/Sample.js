import React from 'react'

function Sample({ loadingPost, loadingUsers, post, users }) {
  return (
    <div>
      <section>
        <h1>포스트</h1>
        {loadingPost && <p>포스트 로딩 중...</p>}
        {!loadingPost && post && (
          <div>
            <h2>{post.title}</h2>
            <p>{post.body}</p>
          </div>
        )}
      </section>
      <hr />
      <section>
        <h1>사용자 목록</h1>
        {loadingUsers && <p>사용자 로딩 중...</p>}
        {!loadingUsers && users && (
          <ul>
            {users.map(user => <li key={user.id}>{user.username} ({user.email})</li>)}
          </ul>
        )}
      </section>
    </div>
  )
}

export default Sample
