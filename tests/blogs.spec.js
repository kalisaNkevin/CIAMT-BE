import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../app.js';

chai.use(chaiHttp);
const api = chai.request(server).keepOpen();
const { expect } = chai;

describe('User workflow tests', () => {
  
  it('should register + login a user, create blog and verify 1 in DB', done => {
    // 1) Register new user
    const user = {
      name: 'Peter Petersen',
      email: 'mail@petersen.com',
      password: '12345678',
      password_confirm: '12345678',
      role: "admin"
    };
   api
      .post('/api/v1/user/signup')
      .send(user)
      .end((err, res) => {
        // Asserts
        expect(res.status).to.be.equal(201);
        expect(res.body).to.be.a('object');
        expect(res.body.error).to.be.equal(undefined);

        // 2) Login the user
       api
          .post('/api/v1/user/login')
          .send({
            email: 'mail@petersen.com',
            password: '12345678'
          })
          .end((err, res) => {
           
            // Asserts
            expect(res.status).to.be.equal(200);
            expect(res.body.error).to.be.equal(undefined);
            const { token } = res.body;

            // 3) Create new blog
            const blog = {
              title: 'Test blog',
              body: 'Test blog Description',
              date: '2020-04-05'
            };
           api
           .post('/api/v1/blogs')
           .set({'Cookie': `jwt=${token}`})
              .send(blog)
              .end((err, res) => {
                // Asserts
                expect(res.status).to.be.equal(201);
                expect(res.body).to.be.a('object');

                const savedBlog = res.body.data.blog;
                expect(savedBlog.title).to.be.equal(blog.title);
                expect(savedBlog.body).to.be.equal(blog.body);

                // 4) Verify one blog in test DB
                const blogId = savedBlog._id;
               api
                  .get(`/api/v1/blogs/${blogId}`)
                  .end((err, res) => {
                    // Asserts
                    expect(res.status).to.be.equal(200);
                    expect(res.body).to.be.a('object');
                    done();
                  });
                });
              });
            });
  }).timeout(30000);

  it('should register + login a user, create blog and delete it from DB', done => {
    // 1) Register new user
    const user = {
      name: 'Peter Petersen',
      email: 'mail@petersen.com',
      password: '12345678',
      password_confirm: '12345678',
      role: "admin"
    };
   api
      .post('/api/v1/user/signup')
      .send(user)
      .end((err, res) => {
        // Asserts
        expect(res.status).to.be.equal(201);
        expect(res.body).to.be.a('object');
        expect(res.body.error).to.be.equal(undefined);

        // 2) Login the user
       api
          .post('/api/v1/user/login')
          .send({
            email: 'mail@petersen.com',
            password: '12345678'
          })
          .end((err, res) => {
            // Asserts
            expect(res.status).to.be.equal(200);
            expect(res.body.error).to.be.equal(undefined);
            const { token } = res.body;

            // 3) Create new blog
            const blog = {
              title: 'Test blog',
              body: 'Test blog Description',
              date: '2022-04-01'
            };

           api
           .post('/api/v1/blogs')
           .set({'Cookie': `jwt=${token}`})
              .send(blog)
              .end((err, res) => {
                // Asserts
                expect(res.status).to.be.equal(201);
                expect(res.body).to.be.a('object');

                 const savedBlog = res.body.data.blog;
                expect(savedBlog.title).to.be.equal(blog.title);
                expect(savedBlog.body).to.be.equal(blog.body);

                // 4) Delete blog
               api
               .delete(`/api/v1/blogs/${savedBlog._id}`)
               .set({'Authorization': `Bearer ${token}`})
                  .end((err, res) => {
                    expect(res.status).to.be.equal(204);
                    done();
                  });
              });
          });
      });
  }).timeout(30000);
