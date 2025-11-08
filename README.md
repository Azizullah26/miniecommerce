# eCommerce Product Listing Module

A full-stack product catalog management system built with React, Node.js, Express, and SQLite. This application provides a complete solution for browsing, filtering, and managing product inventories with a clean, responsive interface.

## 📋 Project Overview

This mini eCommerce platform allows users to:
- Browse products with pagination and category filtering
- Search products by name or category
- View product details including price, category, and stock status
- Add new products with validation
- Manage inventory in real-time

The application demonstrates modern web development best practices with a clean separation between frontend and backend, comprehensive validation, and a responsive user interface.

## 🛠 Tech Stack

### Frontend
- **React 18** with TypeScript - Modern UI library with type safety
- **Vite** - Lightning-fast build tool and dev server
- **TailwindCSS** - Utility-first CSS framework for rapid UI development
- **shadcn/ui** - High-quality, accessible component library
- **React Query** - Powerful data fetching and state management
- **Wouter** - Lightweight routing solution

### Backend
- **Node.js** with Express - Fast, minimalist web framework
- **TypeScript** - Type safety across the entire stack
- **Zod** - Runtime type validation for API requests
- **In-Memory Storage** - Fast development with easy migration path to database

### Why This Stack?

1. **TypeScript Throughout**: End-to-end type safety prevents runtime errors and improves developer experience
2. **React Query**: Eliminates boilerplate for data fetching, caching, and synchronization
3. **Vite**: Instant hot module replacement makes development incredibly fast
4. **TailwindCSS**: Rapid prototyping without leaving HTML, with excellent production optimization
5. **Express**: Battle-tested, minimal overhead, and extensive ecosystem
6. **In-Memory Storage**: Simplifies setup for development while maintaining a clean interface for future database integration

## 🏗 Architecture Overview

```
┌─────────────────────────────────────────────────────────────┐
│                        Client (React)                        │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │   Products   │  │   Filters    │  │  Pagination  │      │
│  │     Page     │  │  Component   │  │  Component   │      │
│  └──────────────┘  └──────────────┘  └──────────────┘      │
│         │                  │                   │            │
│         └──────────────────┴───────────────────┘            │
│                           │                                 │
│                    React Query Layer                        │
│                           │                                 │
└───────────────────────────┼─────────────────────────────────┘
                            │
                     HTTP/JSON API
                            │
┌───────────────────────────┼─────────────────────────────────┐
│                    Express Server                           │
│  ┌──────────────────────────────────────────────────────┐  │
│  │                    API Routes                        │  │
│  │  GET /api/products  │  POST /api/products           │  │
│  └──────────────────────────────────────────────────────┘  │
│                           │                                 │
│  ┌──────────────────────────────────────────────────────┐  │
│  │              Validation Layer (Zod)                  │  │
│  └──────────────────────────────────────────────────────┘  │
│                           │                                 │
│  ┌──────────────────────────────────────────────────────┐  │
│  │               Storage Interface                      │  │
│  │  (In-Memory / Future: SQLite/PostgreSQL)            │  │
│  └──────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
```

### Key Design Decisions

1. **Shared Schema**: Product types defined in `shared/schema.ts` ensure frontend and backend stay in sync
2. **Storage Interface**: Abstract storage layer (`IStorage`) allows easy migration from in-memory to SQLite/PostgreSQL
3. **Server-Side Filtering**: Pagination and filtering happen on the backend for scalability
4. **Optimistic Updates**: React Query handles cache invalidation automatically
5. **Component Composition**: Small, reusable components (ProductCard, CategoryFilter, Pagination) promote maintainability

## 👥 Team Task Breakdown (3-Member Team)

### Frontend Developer
**Focus**: User interface and client-side logic

**Tasks**:
- [ ] Implement product card component with responsive design
- [ ] Build category filter and search functionality
- [ ] Create pagination component with page size options
- [ ] Develop add product dialog with form validation
- [ ] Handle loading and error states
- [ ] Implement React Query hooks for data fetching
- [ ] Add animations and transitions
- [ ] Ensure mobile responsiveness

**Estimated Time**: 2-3 days

### Backend Developer
**Focus**: API development and data management

**Tasks**:
- [ ] Design product schema and validation rules
- [ ] Implement storage interface and in-memory implementation
- [ ] Build REST API endpoints with proper error handling
- [ ] Add pagination and filtering logic
- [ ] Implement input validation with Zod
- [ ] Write API documentation
- [ ] Migrate from in-memory to SQLite (Phase 2)
- [ ] Add database indexes for performance

**Estimated Time**: 2-3 days

### DevOps Engineer
**Focus**: Deployment, infrastructure, and CI/CD

**Tasks**:
- [ ] Set up AWS infrastructure (EC2, RDS, S3)
- [ ] Configure environment variables and secrets
- [ ] Implement CI/CD pipeline with GitHub Actions
- [ ] Set up SSL certificates and domain configuration
- [ ] Configure monitoring and logging
- [ ] Implement backup strategy
- [ ] Document deployment process
- [ ] Set up staging and production environments

**Estimated Time**: 2-3 days

## 🚀 Local Setup Guide

### Prerequisites
- Node.js 20+ installed
- npm or yarn package manager
- Git

### Installation Steps

1. **Clone the repository** (if applicable)
```bash
git clone <repository-url>
cd ecommerce-product-listing
```

2. **Install dependencies**
```bash
npm install
```

3. **Start the development server**
```bash
npm run dev
```

The application will start on `http://localhost:5000` with both frontend and backend running concurrently.

### Project Structure
```
.
├── client/                 # Frontend React application
│   ├── src/
│   │   ├── components/    # Reusable UI components
│   │   ├── pages/        # Page components
│   │   ├── lib/          # Utilities and configurations
│   │   └── hooks/        # Custom React hooks
│   └── index.html
├── server/                # Backend Express application
│   ├── routes.ts         # API route definitions
│   ├── storage.ts        # Storage interface and implementation
│   └── index.ts          # Server entry point
├── shared/               # Shared types and schemas
│   └── schema.ts         # Product schema and validation
└── README.md
```

## 📡 API Documentation

### Base URL
```
http://localhost:5000/api
```

### Endpoints

#### 1. Get All Products
Fetch all products with optional filtering and pagination.

**Endpoint**: `GET /api/products`

**Query Parameters**:
| Parameter | Type   | Required | Description |
|-----------|--------|----------|-------------|
| category  | string | No       | Filter by category (e.g., "Electronics") |
| search    | string | No       | Search in product name and category |
| limit     | number | No       | Number of products per page (default: all) |
| offset    | number | No       | Number of products to skip (default: 0) |

**Example Request**:
```bash
curl "http://localhost:5000/api/products?category=Electronics&limit=10&offset=0"
```

**Example Response**:
```json
{
  "products": [
    {
      "id": 1,
      "name": "Wireless Bluetooth Speaker",
      "price": 79.99,
      "category": "Electronics",
      "stock_status": "In Stock",
      "created_at": "2025-01-08T10:30:00.000Z"
    },
    {
      "id": 4,
      "name": "Wireless Ergonomic Mouse",
      "price": 49.99,
      "category": "Electronics",
      "stock_status": "In Stock",
      "created_at": "2025-01-08T10:30:00.000Z"
    }
  ],
  "total": 2
}
```

#### 2. Get Product by ID
Fetch a single product by its ID.

**Endpoint**: `GET /api/products/:id`

**Example Request**:
```bash
curl http://localhost:5000/api/products/1
```

**Example Response**:
```json
{
  "id": 1,
  "name": "Wireless Bluetooth Speaker",
  "price": 79.99,
  "category": "Electronics",
  "stock_status": "In Stock",
  "created_at": "2025-01-08T10:30:00.000Z"
}
```

#### 3. Create Product
Add a new product to the catalog.

**Endpoint**: `POST /api/products`

**Request Body**:
```json
{
  "name": "Premium Headphones",
  "price": 199.99,
  "category": "Electronics",
  "stock_status": "In Stock"
}
```

**Validation Rules**:
- `name`: String, 1-100 characters, required
- `price`: Number, must be positive, required
- `category`: String, required
- `stock_status`: Enum ("In Stock", "Low Stock", "Out of Stock"), required

**Example Request**:
```bash
curl -X POST http://localhost:5000/api/products \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Premium Headphones",
    "price": 199.99,
    "category": "Electronics",
    "stock_status": "In Stock"
  }'
```

**Example Response** (201 Created):
```json
{
  "id": 13,
  "name": "Premium Headphones",
  "price": 199.99,
  "category": "Electronics",
  "stock_status": "In Stock",
  "created_at": "2025-01-08T10:45:00.000Z"
}
```

**Error Response** (400 Bad Request):
```json
{
  "error": "Validation failed",
  "details": "Validation error: Expected number, received string at \"price\""
}
```

## ☁️ AWS Deployment Plan

### Infrastructure Components

#### 1. Application Server (AWS EC2)
**Purpose**: Host the Node.js/Express backend

**Setup Steps**:
1. Launch an EC2 instance (t3.micro for free tier, t3.small for production)
2. Choose Ubuntu 22.04 LTS AMI
3. Configure security group:
   - Allow HTTP (80) and HTTPS (443) from anywhere
   - Allow SSH (22) from your IP only
4. Install Node.js 20+:
   ```bash
   curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
   sudo apt-get install -y nodejs
   ```
5. Clone repository and install dependencies
6. Use PM2 for process management:
   ```bash
   npm install -g pm2
   pm2 start npm --name "ecommerce-api" -- start
   pm2 startup
   pm2 save
   ```

**Alternative**: Use AWS Elastic Beanstalk for easier deployment
- Automatic load balancing and auto-scaling
- Zero-downtime deployments
- Integrated monitoring

#### 2. Database (AWS RDS)
**Purpose**: PostgreSQL database for production data

**Setup Steps**:
1. Create RDS PostgreSQL instance (db.t3.micro for free tier)
2. Configure security group to allow connections from EC2 only
3. Note connection details (endpoint, port, credentials)
4. Update application environment variables:
   ```
   DATABASE_URL=postgresql://username:password@endpoint:5432/dbname
   ```
5. Run database migrations (when implemented)

**Migration from In-Memory**:
- Current code uses storage interface - easy to swap implementations
- Update `server/storage.ts` to use PostgreSQL adapter
- Use Drizzle ORM for database operations (already configured)

#### 3. File Storage (AWS S3)
**Purpose**: Store and serve product images

**Setup Steps**:
1. Create S3 bucket with unique name (e.g., `ecommerce-products-images`)
2. Configure bucket policy for public read access:
   ```json
   {
     "Version": "2012-10-17",
     "Statement": [{
       "Sid": "PublicReadGetObject",
       "Effect": "Allow",
       "Principal": "*",
       "Action": "s3:GetObject",
       "Resource": "arn:aws:s3:::ecommerce-products-images/*"
     }]
   }
   ```
3. Enable CloudFront CDN for faster delivery (optional)
4. Install AWS SDK:
   ```bash
   npm install @aws-sdk/client-s3
   ```
5. Implement image upload endpoint in API
6. Store S3 URLs in product records

#### 4. IAM Roles and Permissions

**EC2 Instance Role**:
```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": [
        "s3:PutObject",
        "s3:GetObject",
        "s3:DeleteObject"
      ],
      "Resource": "arn:aws:s3:::ecommerce-products-images/*"
    },
    {
      "Effect": "Allow",
      "Action": [
        "rds:DescribeDBInstances"
      ],
      "Resource": "*"
    }
  ]
}
```

**Deployment User** (for CI/CD):
```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": [
        "ec2:*",
        "elasticbeanstalk:*",
        "s3:*",
        "rds:*"
      ],
      "Resource": "*"
    }
  ]
}
```

### CI/CD Pipeline (GitHub Actions)

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to AWS

on:
  push:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v3
    
    - name: Setup Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '20'
    
    - name: Install dependencies
      run: npm ci
    
    - name: Build frontend
      run: npm run build
    
    - name: Configure AWS credentials
      uses: aws-actions/configure-aws-credentials@v2
      with:
        aws-access-key-id: ${{ secrets.AWS_ACCESS_KEY_ID }}
        aws-secret-access-key: ${{ secrets.AWS_SECRET_ACCESS_KEY }}
        aws-region: us-east-1
    
    - name: Deploy to EC2
      env:
        PRIVATE_KEY: ${{ secrets.EC2_SSH_KEY }}
        HOST: ${{ secrets.EC2_HOST }}
        USER: ubuntu
      run: |
        echo "$PRIVATE_KEY" > private_key && chmod 600 private_key
        ssh -o StrictHostKeyChecking=no -i private_key ${USER}@${HOST} '
          cd /var/www/ecommerce &&
          git pull origin main &&
          npm install &&
          npm run build &&
          pm2 restart ecommerce-api
        '
```

### Environment Configuration

Create `.env.production`:
```bash
NODE_ENV=production
PORT=5000
DATABASE_URL=postgresql://user:pass@rds-endpoint:5432/ecommerce
AWS_REGION=us-east-1
S3_BUCKET=ecommerce-products-images
SESSION_SECRET=your-secret-key-here
```

### Cost Estimates (Monthly)

**Free Tier Eligible** (First 12 months):
- EC2 t3.micro: $0 (750 hours/month free)
- RDS db.t3.micro: $0 (750 hours/month free)
- S3: $0 (5GB storage, 20,000 GET requests free)
- Data Transfer: $0 (1GB free)

**After Free Tier**:
- EC2 t3.micro: ~$7.50/month
- RDS db.t3.micro: ~$15/month
- S3: ~$0.50/month (20GB storage)
- CloudFront CDN: ~$1/month (minimal traffic)
- **Total**: ~$24/month

**Production Scale** (1000+ users):
- EC2 t3.medium: ~$30/month
- RDS db.t3.small: ~$30/month
- S3 + CloudFront: ~$5/month
- Load Balancer: ~$20/month
- **Total**: ~$85/month

### Security Checklist
- [ ] Enable HTTPS with SSL/TLS certificates (Let's Encrypt)
- [ ] Store secrets in AWS Secrets Manager
- [ ] Enable CloudWatch monitoring and alerting
- [ ] Configure automated backups for RDS
- [ ] Implement rate limiting on API endpoints
- [ ] Set up Web Application Firewall (WAF)
- [ ] Enable AWS CloudTrail for audit logging
- [ ] Use VPC with private subnets for RDS

## 🚧 Future Enhancements

### Phase 2 - Enhanced Features
- [ ] User authentication with JWT
- [ ] Product image upload and management
- [ ] Advanced filtering (price range, multiple categories)
- [ ] Product reviews and ratings
- [ ] Shopping cart functionality
- [ ] Order management system
- [ ] Inventory tracking and alerts

### Phase 3 - Optimization
- [ ] Full-text search with Elasticsearch
- [ ] Redis caching layer
- [ ] GraphQL API option
- [ ] Real-time inventory updates with WebSockets
- [ ] Analytics dashboard
- [ ] CSV import/export for bulk operations
- [ ] Multi-language support (i18n)

### Phase 4 - Advanced Features
- [ ] AI-powered product recommendations
- [ ] Automated inventory restocking alerts
- [ ] Mobile application (React Native)
- [ ] Admin panel for product management
- [ ] Multi-vendor marketplace support
- [ ] Payment gateway integration
- [ ] Email notifications

## 🧪 Testing

### Running Tests (Future Implementation)
```bash
# Frontend tests
npm run test:client

# Backend tests
npm run test:server

# E2E tests
npm run test:e2e
```

### Test Coverage Goals
- Unit tests: 80%+ coverage
- Integration tests for all API endpoints
- E2E tests for critical user flows

## 📝 License

This project is open source and available under the MIT License.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📧 Support

For questions or issues, please open an issue on GitHub or contact the development team.

---

**Built with ❤️ using React, Node.js, and TypeScript**
