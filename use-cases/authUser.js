module.exports = function makeAuthUser(getUser, compare){
  return async function authUser({body}){
    const user = await getUser(body);
    const isAuthentic = await compare(body.password, user.password);
    if(isAuthentic){
      return user;
    }
    throw new Error('Username or password do not match');
  }
}