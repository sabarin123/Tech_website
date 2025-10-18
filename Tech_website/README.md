# Sabari Tech — Static Website
This is a simple static website (HTML/CSS/JS) you can host on an AWS EC2 instance or push to GitHub.

## Project structure
```
website_project/
  index.html
  about.html
  services.html
  contact.html
  css/style.css
  js/script.js
  README.md
```

## Quick start — run locally
1. Unzip the project.
2. Open `index.html` in your browser.

## Deploy to AWS EC2 (Linux Amazon Linux 2) — step-by-step
1. Launch an EC2 instance (Amazon Linux 2). Make sure HTTP (80) is allowed in the security group.
2. SSH into the instance:
   ```bash
   ssh -i /path/to/key.pem ec2-user@<EC2_PUBLIC_IP>
   ```
3. Install Nginx:
   ```bash
   sudo yum update -y
   sudo yum install nginx -y
   sudo systemctl start nginx
   sudo systemctl enable nginx
   ```
4. Upload the website files to the instance. From your local machine:
   ```bash
   scp -i /path/to/key.pem -r website_project/* ec2-user@<EC2_PUBLIC_IP>:/home/ec2-user/
   ```
5. Move files to Nginx default directory:
   ```bash
   sudo mv /home/ec2-user/* /usr/share/nginx/html/
   sudo chown -R nginx:nginx /usr/share/nginx/html
   sudo systemctl restart nginx
   ```
6. Open http://<EC2_PUBLIC_IP>/ in your browser.

## Add to GitHub
1. Create a new GitHub repo.
2. Initialize git and push:
   ```bash
   git init
   git add .
   git commit -m "Initial website commit"
   git branch -M main
   git remote add origin git@github.com:YOUR_USERNAME/YOUR_REPO.git
   git push -u origin main
   ```

## Next steps & recommendations
- Add HTTPS: use Certbot to issue Let's Encrypt certificates.
- Make contact form functional: add a simple backend (Node.js or serverless function) or use form services.
- Automate deploy: create a GitHub Actions workflow to upload to EC2 or deploy to S3 + CloudFront.
- For an app or eCommerce store, consider Dockerizing the backend and using RDS for data.

If you want, I can:
- Create a GitHub Actions file to auto-deploy.
- Convert this into a Node.js app with a real contact API.
- Produce a zipped package you can download.
