'use strict'

// use models
const Post = use('App/Models/Post')

class PostController {

    async index({ view }) {

        const posts = await Post.all();

        return view.render('/posts/postPage', {
            title: 'Latest posts',
            posts: posts.toJSON()
        });
    }

    async detail({ request, view, response, auth, params }) {

        const post = await Post.findBy('id', params.id);
        return view.render('/posts/postDetail', { post: post })

    }

    async add({ request, view, response, auth }) {
        return view.render('/posts/addPost')
    }

    async saveData({ request, view, response, auth, session }) {

        const post = new Post;

        post.title = request.input('title')
        post.body = request.input('body')

        await post.save();

        session.flash({ notification: 'Post added' })

        return response.redirect('/posts')
    }

    async getEditPost({ request, view, response, auth, params }) {

        // find user id
        const post = await Post.find(params.id);
        return view.render('posts.editPost', { post: post })

    }

    async postEditData({ request, view, response, auth }) {

        const post = await Post.findBy('id', params.id)
        post.title = request.input('title')
        post.body = request.input('body')

        await post.save();

        return response.redirect('/posts')

    }

}

module.exports = PostController