const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    const sum = blogs.reduce((acc, current) => {
        return acc + current.likes
    }, 0)
    return sum
}

const favoriteBlog = (blogs) => {
    let result = blogs[0]
    for(let i = 1; i < blogs.length; i++){
        if(blogs[i].likes > result.likes){
            result = blogs[i]
        }
    }
    return result
}

const mostBlogs = (blogs) => {
    const dict = {}
    for(let i = 0; i < blogs.length; i++){
        let curblog = blogs[i]
        if(dict.hasOwnProperty(curblog.author)){
            dict[curblog.author] = 1
        } else {
            dict[curblog.author] = dict[curblog.author]+1
        }
    }
    for(const [key, value] of Object.entries(dict)){
        
    }
}

module.exports = {
    totalLikes, dummy, favoriteBlog
}