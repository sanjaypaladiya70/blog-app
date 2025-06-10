import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [posts, setPosts] = useState([]);
  const [selectedPost, setSelectedPost] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/posts');
      setPosts(response.data);
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  };

  const handleCreatePost = async (post) => {
    try {
      const response = await axios.post('http://localhost:5000/api/posts', post);
      setPosts([...posts, response.data]);
    } catch (error) {
      console.error('Error creating post:', error);
    }
  };

  const handleUpdatePost = async (id, post) => {
    try {
      const response = await axios.put(`http://localhost:5000/api/posts/${id}`, post);
      setPosts(posts.map(p => p.id === id ? response.data : p));
      setSelectedPost(null);
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating post:', error);
    }
  };

  const handleDeletePost = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/posts/${id}`);
      setPosts(posts.filter(p => p.id !== id));
    } catch (error) {
      console.error('Error deleting post:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-gray-800 text-white py-6 shadow-md">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold text-center">My Blog</h1>
        </div>
      </header>
      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-800">Posts</h2>
            {posts.map(post => (
              <div key={post.id} className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">{post.title}</h3>
                <p className="text-gray-600 mb-4">{post.content.substring(0, 100)}...</p>
                <div className="flex gap-3">
                  <button
                    onClick={() => {
                      setSelectedPost(post);
                      setIsEditing(true);
                    }}
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeletePost(post.id)}
                    className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-colors"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              {isEditing ? 'Edit Post' : 'Create New Post'}
            </h2>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                const formData = new FormData(e.target);
                const post = {
                  title: formData.get('title'),
                  content: formData.get('content')
                };
                if (isEditing) {
                  handleUpdatePost(selectedPost.id, post);
                } else {
                  handleCreatePost(post);
                }
                e.target.reset();
              }}
              className="space-y-4"
            >
              <div>
                <input
                  type="text"
                  name="title"
                  placeholder="Title"
                  defaultValue={selectedPost?.title}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <textarea
                  name="content"
                  placeholder="Content"
                  defaultValue={selectedPost?.content}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[150px]"
                />
              </div>
              <div className="flex gap-3">
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 transition-colors"
                >
                  {isEditing ? 'Update' : 'Create'}
                </button>
                {isEditing && (
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedPost(null);
                      setIsEditing(false);
                    }}
                    className="bg-gray-500 text-white px-6 py-2 rounded hover:bg-gray-600 transition-colors"
                  >
                    Cancel
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
