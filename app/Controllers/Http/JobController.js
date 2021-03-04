'use strict'

const Job=use('App/Models/Job')

class JobController {

    // method name: home
    async home({ request, view, response, auth }) {

        // // this one will be used to insert new data
        // const job = new Job;

        // job.title = 'Mern Stack Developer'
        // job.description = 'Detailed description can be written here'
        // job.link = 'www.google.domain'
        // job.user_id = 'asd54545545'
        
        // await job.save();

        // this one will be used to fetch data
        const jobs = await Job.all();

        return view.render('index', { jobs:jobs.toJSON() })
    }

}

module.exports = JobController
