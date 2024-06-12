const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('./models/User');
const Book = require('./models/Book');
const Conteudo = require('./models/Conteudo');

const nodemailer = require('nodemailer');
const fs = require('fs');
const imageDownloader = require('image-downloader');
const multer = require('multer');
const Group = require('./models/Group');
require('dotenv').config();

const app = express();

//Bcrypt salt and JWT secret

const salt = bcrypt.genSaltSync(10);
const jwtSecret = 'minhavelhacomproumeujantarsopauvanozespãorussonocalção';

//Middlewares setup

app.use(express.json());
app.use(cookieParser());
app.use('/uploads', express.static(__dirname+'/uploads'));
app.use(cors({
    credentials: true,
    origin: 'http://localhost:5173',
}));

//Multer middleware configuration for image upload
const photosMiddleware = multer({dest: 'uploads/'});

//MongoDb connection

mongoose.connect(process.env.MONGO_URL).then((response) => {
    console.log('Banco de dados conectado.')
}).catch(err => {
    console.log('Erro ao se conectar: ');
    console.log(err);
})

//Get user data from token for private routes

function getUserDataFromReq(req) {
    return new Promise((resolve, reject) => {
        jwt.verify(req.cookies.token, jwtSecret, {}, async (err, userData) => {
            if (err) throw err;
            resolve(userData);
        });
    })
}

app.post('/confirmar-email', (req, res) => {
    const {name, username, email, password, codes} = req.body;
    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
          // TODO: replace `user` and `pass` values from <https://forwardemail.net>
          user: "indexpage.me@gmail.com",
          pass: process.env.GMAIL_API_KEY,
        },
      });

    // async..await is not allowed in global scope, must use a wrapper
    async function main() {
        // send mail with defined transport object
        const info = await transporter.sendMail({
        from: 'N54 Club', // sender address
        to: email, // list of receivers
        subject: 'Confirme sua conta na N54 Club', // Subject line
        text: 'Falta apenas um passo para você fazer parte da N54 Club. Esse é o seu código: '+codes, // plain text body
        html: '', // html body
        });
    
        console.log("Message sent: %s", info.messageId);
        // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
    
        //
        // NOTE: You can go to https://forwardemail.net/my-account/emails to see your email delivery status and preview
        //       Or you can use the "preview-email" npm package to preview emails locally in browsers and iOS Simulator
        //       <https://github.com/forwardemail/preview-email>
        //
    }

    main().catch(console.error);
    
    res.json(codes);
})

app.post('/2fa-confirmar-email', (req, res) => {
    const {name, username, email, password, codes} = req.body;
    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
          // TODO: replace `user` and `pass` values from <https://forwardemail.net>
          user: "indexpage.me@gmail.com",
          pass: process.env.GMAIL_API_KEY,
        },
      });

    // async..await is not allowed in global scope, must use a wrapper
    async function main() {
        // send mail with defined transport object
        const info = await transporter.sendMail({
        from: 'N54 Club', // sender address
        to: email, // list of receivers
        subject: 'Faça login na sua conta da N54 Club', // Subject line
        text: 'Falta apenas um passo para você fazer login na N54 Club. Esse é o seu código: '+codes, // plain text body
        html: '', // html body
        });
    
        console.log("Message sent: %s", info.messageId);
        // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
    
        //
        // NOTE: You can go to https://forwardemail.net/my-account/emails to see your email delivery status and preview
        //       Or you can use the "preview-email" npm package to preview emails locally in browsers and iOS Simulator
        //       <https://github.com/forwardemail/preview-email>
        //
    }

    main().catch(console.error);
    
    res.json(codes);
})

app.post('/cadastro', async (req, res) => {
    const {name, username, email, password} = req.body;
    try {
        const userDoc = await User.create({
            name, 
            username,
            email,
            password:bcrypt.hashSync(password, salt),
        })

        res.json(userDoc);
    } catch (e) {
        res.status(422).json(e);
        console.log(e);
    }
})

app.post('/login', async (req, res) => {
    const {email, password} = req.body;
    const userDoc = await User.findOne({email});
    if (userDoc) {
        const passOk = bcrypt.compareSync(password, userDoc.password);
        if (passOk) {
            jwt.sign({
                email:userDoc.email,
                id:userDoc._id
            }, jwtSecret, {}, (err, token) => {
                if (err) throw err;
                res.cookie('token', token, {
                    secure: true, // Set to true if served over HTTPS
                    sameSite: 'None',
                }).json(userDoc);
            });
        } else {
            res.status(422).json('A senha não está correta.')
        }
    } else {
        res.json('Usuário não encontrado.')
    }
})

app.get('/profile', (req, res) => {
    const {token} = req.cookies;
    try {
        if (token) {
            jwt.verify(token, jwtSecret, {}, async (err, userData) => {
                if (err) throw err;
                const {name, username, photo, email, _id, following, followers, admin} = await User.findById(userData.id);
                res.json({name, username, photo, email, _id, following, followers, admin});
            })
        } else {
            res.json(null)
        }
    } catch (e) {
        console.log('Error: ');
        console.log(e);
    }
})

app.post('/logout', (req, res) => {
    res.cookie('token', '').json(true);
})

app.post('/uploadbylink', async (req, res) => {
    const {link} = req.body;
    const newName = 'photo'+Date.now()+'.jpg';

    await imageDownloader.image({
        url: link,
        dest: __dirname+'/uploads/'+newName,
    });
    res.json(await newName);
})

app.post('/upload', photosMiddleware.array('photos', 10), (req, res) => {
    const uploadedFiles = [];

    for (let i = 0; i <req.files.length; i++){
        const {path, originalname} = req.files[i];
        const parts = originalname.split('');
        const ext = parts[parts.length - 1];
        const newPath = path + '.' + ext;
        fs.renameSync(path, newPath);
        uploadedFiles.push(newPath.replace('uploads/', ''));
    }

    res.json(uploadedFiles);
})

app.post('/criar-book', async (req, res) => {
    const userData =  await getUserDataFromReq(req);
    console.log("Aqui: ",userData)

    const {bookTitle, bookDescription, bookAddedPhotos, dia} = req.body;

    const {admin} = await User.findById(userData.id);

    const index = await Book.find();

    if(admin === true){
        Book.create({
            title:bookTitle,
            description:bookDescription,
            photos:bookAddedPhotos,
            dia,
            owner:userData.id,
            index:index.length
        }).then(doc => {
            res.json(doc)
        }).catch(err => {
            throw err;
        })
    }
})

app.put('/criar-book', async (req, res) => {
    const userData = await getUserDataFromReq(req);

    const {bookTitle, bookDescription, bookAddedPhotos, dia, id} = req.body;

    const {admin} = await User.findById(userData.id);


    try {
        if(admin === true){
            const postDoc = await Book.findById(id);
            if(userData.id === postDoc.owner.toString()){
                postDoc.set({
                    title:bookTitle,
                    description:bookDescription,
                    photos:bookAddedPhotos,
                    modific:dia,
                    owner:userData.id,
                })

                await postDoc.save();
                res.json(postDoc);
            }
        }
    
    } catch(err){
        console.log(err)
    }
})

app.get('/get-books', async (req, res) => {
    res.json(await Book.find().sort({dia: -1}).populate('owner', ['username', 'dia']).sort({createdAt: -1}));
})

app.get('/get-book/:id', async (req, res) => {
    const {id} = req.params;
    res.json(await Book.findById(id))
})

app.post('/criar-conteudo', async (req, res) => {
    const userData = await getUserDataFromReq(req);

    const {contentTitle, contentDescription, contentAddedPhotos, contentContent, dia, id} = req.body;

    const {admin} = await User.findById(userData.id);

    const index = await Conteudo.find({conjunto: id});

    console.log(id)
    try {
        if(admin === true){
            Conteudo.create({
                title:contentTitle,
                description:contentDescription,
                content: contentContent,
                photos:contentAddedPhotos,
                dia,
                owner:userData.id,
                index:index.length,
                conjunto: id
            })
        }
    
        res.json(index)
    } catch(err){
        console.log(err)
    }
})

app.put('/criar-conteudo', async (req, res) => {
    const userData = await getUserDataFromReq(req);

    const {contentTitle, contentDescription, contentAddedPhotos, contentContent, dia, id} = req.body;

    const {admin} = await User.findById(userData.id);


    try {
        if(admin === true){
            const postDoc = await Conteudo.findById(id);
            if(userData.id === postDoc.owner.toString()){
                postDoc.set({
                    title:contentTitle,
                    description:contentDescription,
                    content: contentContent,
                    photos:contentAddedPhotos,
                })

                await postDoc.save();
                res.json(postDoc);
            }
        }
    
    } catch(err){
        console.log(err)
    }
})

app.get('/get-contents/:id', async (req, res) => {
    const {id} = req.params;
    res.json(await Conteudo.find({ conjunto: id }).sort({dia: -1}).populate('owner', ['username', 'dia']));
})

app.get('/content/:id', async (req, res) => {
    const {id} = req.params;
    res.json(await Conteudo.findById(id));
})

app.post('/criar-grupo', async (req, res) => {
    const userData = await getUserDataFromReq(req);
    const {groupTitle, booksArray, dia} = req.body;

    const fullUserDoc = await User.findById(userData?.id);
    
    try {
        if(fullUserDoc?.admin){
            const group = await Group.create({
                tag:groupTitle,
                dia,
                owner:userData?.id,
                modulesArray:booksArray
            })

            try {

                if(fullUserDoc?.admin){
                    booksArray.map((item) => {  
                        console.log(item)  
                        Book.findById(item).then(response => {
                            console.log(response);
                            return response.set({ group: group._id, groupTag: groupTitle });
                        }).then(updatedResponse => {
                            return updatedResponse.save();
                        }).then(() => {
                            console.log('Book updated and saved successfully.');
                        }).catch(error => {
                            console.log(error);
                        });
                    })
                }
                res.json();
            } catch(err){
                console.log(err)
            }
        }
    
    } catch(err){
        console.log(err)
    }
})

app.put('/criar-grupo', async (req, res) => {
    const userData = await getUserDataFromReq(req);
    const {id, groupTitle, booksArray, booksOutArray, dia} = req.body;

    const fullUserDoc = await User.findById(userData?.id);

    try {
        const groupDoc = await Group.findById(id);
        if(fullUserDoc?.admin){
            
            if(booksArray.length === 0){
                console.log('Funcionando.')
                console.log(groupDoc)
                await Group.findByIdAndDelete(id);

                try {
                    booksOutArray.map((item) => {  
                        console.log(item)  
                        Book.findById(item).then(response => {
                            console.log(response);
                            return response.set({ group: 'padrão', groupTag: '' });
                        }).then(updatedResponse => {
                            return updatedResponse.save();
                        }).then(() => {
                            console.log('Book updated and saved successfully.');
                        }).catch(error => {
                            console.log(error);
                        });
                    })
                    res.json();
                } catch(err){
                    console.log(err)
                }
            } else {
                groupDoc.set({
                    tag: groupTitle,
                    modulesArray:booksArray
                })
    
                const group = await groupDoc.save();
                res.json(groupDoc);
    
                try {
    
                    if(fullUserDoc?.admin){
                        booksArray.map((item) => {  
                            console.log(item)  
                            Book.findById(item).then(response => {
                                console.log(response);
                                return response.set({ group: group._id, groupTag: groupTitle });
                            }).then(updatedResponse => {
                                return updatedResponse.save();
                            }).then(() => {
                                console.log('Book updated and saved successfully.');
                            }).catch(error => {
                                console.log(error);
                            });
                        })
    
                        booksOutArray.map((item) => {  
                            console.log(item)  
                            Book.findById(item).then(response => {
                                console.log(response);
                                return response.set({ group: 'padrão', groupTag: '' });
                            }).then(updatedResponse => {
                                return updatedResponse.save();
                            }).then(() => {
                                console.log('Book updated and saved successfully.');
                            }).catch(error => {
                                console.log(error);
                            });
                        })
                    }
                    res.json();
                } catch(err){
                    console.log(err)
                }
            }
        }
    
    } catch(err){
        console.log(err)
    }
})

app.post('/delete-group', async (req, res) => {
    const userData = await getUserDataFromReq(req);
    const {id, booksArray} = req.body;

    const {admin} = await User.findById(userData?.id);

    if(admin){
        await Group.findByIdAndDelete(id);

    try {
        booksArray.map((item) => {  
            console.log(item)  
            Book.findById(item).then(response => {
                console.log(response);
                return response.set({ group: 'padrão', groupTag: '' });
            }).then(updatedResponse => {
                return updatedResponse.save();
            }).then(() => {
                console.log('Book updated and saved successfully.');
            }).catch(error => {
                console.log(error);
            });
        })
        res.json();
    } catch(err){
        console.log(err)
    }

    res.json()
    }
})

app.get('/get-groups', async (req, res) => {
    res.json(await Group.find().sort({dia: -1}).populate('owner', ['username', 'dia']).sort({createdAt: -1}));
})

app.get('/get-group/:id', async (req, res) => {
    const {id} = req.params;
    res.json(await Group.findById(id));
})

//Start the server

app.listen(5000, () => {
    console.log('Servidor online.')
})