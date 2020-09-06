/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateUser = /* GraphQL */ `
  subscription OnCreateUser {
    onCreateUser {
      id
      username
      name
      image
      posts {
        items {
          id
          caption
          image
          userID
          likes
          createdAt
          updatedAt
        }
        nextToken
      }
      stories {
        items {
          id
          image
          userID
          createdAt
          updatedAt
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateUser = /* GraphQL */ `
  subscription OnUpdateUser {
    onUpdateUser {
      id
      username
      name
      image
      posts {
        items {
          id
          caption
          image
          userID
          likes
          createdAt
          updatedAt
        }
        nextToken
      }
      stories {
        items {
          id
          image
          userID
          createdAt
          updatedAt
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteUser = /* GraphQL */ `
  subscription OnDeleteUser {
    onDeleteUser {
      id
      username
      name
      image
      posts {
        items {
          id
          caption
          image
          userID
          likes
          createdAt
          updatedAt
        }
        nextToken
      }
      stories {
        items {
          id
          image
          userID
          createdAt
          updatedAt
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const onCreatePost = /* GraphQL */ `
  subscription OnCreatePost {
    onCreatePost {
      id
      caption
      image
      userID
      likes
      comments {
        items {
          id
          content
          userID
          postID
          createdAt
          updatedAt
        }
        nextToken
      }
      user {
        id
        username
        name
        image
        posts {
          nextToken
        }
        stories {
          nextToken
        }
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
export const onUpdatePost = /* GraphQL */ `
  subscription OnUpdatePost {
    onUpdatePost {
      id
      caption
      image
      userID
      likes
      comments {
        items {
          id
          content
          userID
          postID
          createdAt
          updatedAt
        }
        nextToken
      }
      user {
        id
        username
        name
        image
        posts {
          nextToken
        }
        stories {
          nextToken
        }
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
export const onDeletePost = /* GraphQL */ `
  subscription OnDeletePost {
    onDeletePost {
      id
      caption
      image
      userID
      likes
      comments {
        items {
          id
          content
          userID
          postID
          createdAt
          updatedAt
        }
        nextToken
      }
      user {
        id
        username
        name
        image
        posts {
          nextToken
        }
        stories {
          nextToken
        }
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
export const onCreateComment = /* GraphQL */ `
  subscription OnCreateComment {
    onCreateComment {
      id
      content
      userID
      postID
      post {
        id
        caption
        image
        userID
        likes
        comments {
          nextToken
        }
        user {
          id
          username
          name
          image
          createdAt
          updatedAt
        }
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateComment = /* GraphQL */ `
  subscription OnUpdateComment {
    onUpdateComment {
      id
      content
      userID
      postID
      post {
        id
        caption
        image
        userID
        likes
        comments {
          nextToken
        }
        user {
          id
          username
          name
          image
          createdAt
          updatedAt
        }
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteComment = /* GraphQL */ `
  subscription OnDeleteComment {
    onDeleteComment {
      id
      content
      userID
      postID
      post {
        id
        caption
        image
        userID
        likes
        comments {
          nextToken
        }
        user {
          id
          username
          name
          image
          createdAt
          updatedAt
        }
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
export const onCreateStory = /* GraphQL */ `
  subscription OnCreateStory {
    onCreateStory {
      id
      image
      userID
      user {
        id
        username
        name
        image
        posts {
          nextToken
        }
        stories {
          nextToken
        }
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateStory = /* GraphQL */ `
  subscription OnUpdateStory {
    onUpdateStory {
      id
      image
      userID
      user {
        id
        username
        name
        image
        posts {
          nextToken
        }
        stories {
          nextToken
        }
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteStory = /* GraphQL */ `
  subscription OnDeleteStory {
    onDeleteStory {
      id
      image
      userID
      user {
        id
        username
        name
        image
        posts {
          nextToken
        }
        stories {
          nextToken
        }
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
