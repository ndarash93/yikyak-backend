module.exports = function makeUser({
  phoneNumber,
  email
}){
  const user = {
    phoneNumber: phoneNumber,
    email: email,
    likedPosts: [],
    dislikedPosts: [],
    posts: [],
    dateCreated: new Date()
  }

  if(!verifyPhoneNumber(phoneNumber)){
    throw new Error('Phone number is invalid');
  }

  if(!verifyEmail(email)){
    //throw new Error('Email is invalid');
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

function verifyEmail(email){
  return '^.*@.*\..*$'.test(email);
}