const redirectInProfile = (userId, otherUserId) => {
    if (userId === otherUserId) {
        return '/personal-account/profile'
    } else {
        return `/view-profile/${otherUserId}`
    }
}

export default redirectInProfile