import mailer from 'nodemailer';
import config from '../config/config.js';

export default class MailingService {
    constructor(){
        this.client = mailer.createTransport({
            service: 'gmail',
            port: 587,
            auth: {
                user: config.gmail.GMAIL_USER,
                pass: config.gmail.GMAIL_PASSWORLD
            }
        });
    }
    sendSimpleMail = async({from, to, subject, html, attachments = []}) => {
        let result = await this.client.sendMail({
            from,
            to,
            subject,
            html,
            attachments
        })
        return result;
    }
}