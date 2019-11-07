module.exports = function makeUser(userInfo){
  const user = {
    phoneNumber: userInfo.phoneNumber,
    email: postInfo.email,
    likedPosts: [],
    dislikedPosts: [],
    posts: [],
    dateCreated: new Date()
  }

  if(!verifyPhoneNumber(userInfo.phoneNumber)){
    throw new Error('Phone number is invalid');
  }

  return Object.freeze({
    getPhoneNumber: () => {return user.phoneNumber},
    getDateCreated: () => {return user.dateCreated},
    getLikes: () => {return user.likedPosts},
    getDislikes: () => {return user.dislikedPosts},
    getPosts: () => {return user.posts}
  });
}

function verifyPhoneNumber(number){
  return '^[0-9]{3}-[0-9]{3}-[0-9]{4}$'.test(number);
}