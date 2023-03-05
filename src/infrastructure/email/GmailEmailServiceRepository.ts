import { Either, Result, left, right } from "../../core/logic/result";
import { AppError } from "../../core/shared/appError";
import { EmailServiceRepository } from "../../domain/repositories/email/emaikService.repository";
import { createTransport } from "nodemailer";

import { compile } from "handlebars";
import { readFileSync } from "fs";
import path from "path";

type Response = Either<AppError.UnexpectedError, Result<any>>;

export class GmailEmailServiceRepository implements EmailServiceRepository {
  constructor() {}

  async send(
    email: string,
    subject: string,
    payload: { nome: string; link: string },
    template: string
  ): Promise<Response> {
    try {
      const transporter = createTransport({
        host: process.env.EMAIL_HOST,
        port: 465,
        auth: {
          user: process.env.EMAIL_USERNAME,
          pass: process.env.EMAIL_PASSWORD,
        },
      });

      const source = readFileSync(path.join(__dirname, template), "utf8");
      const compiledTemplate = compile(source);
      const options = () => {
        return {
          from: process.env.FROM_EMAIL,
          to: email,
          subject: subject,
          html: compiledTemplate(payload),
        };
      };

      await transporter.sendMail(options());

      return right(Result.ok<string>("E-mail sended"));
      
    } catch (error) {
      return left(new AppError.UnexpectedError(error));
    }
  }
}
