# 🌰 Dotori-Frontend

> **Equal Opportunities for Students at a Fair Price.**
> Smart help. Honest prices. Real opportunity.

---

## Repositories

* Backend: [dotori-backend](https://github.com/lukasp-dev/dotori-backend)
* AI Server: [dotori-fastapi](https://github.com/lukasp-dev/dotori-fastapi)
* Data: [dotori-data](https://github.com/lukasp-dev/dotori-data)

---

## Why Dotori?

Navigating college admissions—especially abroad—can be stressful, confusing, and far too expensive.
Agencies charge steep fees for services as simple as essay review, leaving many students without affordable guidance.

**Dotori changes this.**
We provide **24/7 AI-powered essay feedback**, **resume-driven prompts**, and a **final human review**, all at a fair price.
Built by students, for students—because your story deserves to be written, not priced.

---

## Features

* **AI Essay Feedback** – Get instant corrections and suggestions, anytime.
* **Resume-Driven Prompts** – Essay ideas tailored to your unique background.
* **Final Human Review** – Real experts ensure your voice stays authentic.
* **Dream School Guidance** – Strategic advice on where to apply.
* **School Analysis** – Data-driven insights into universities.
* **Alumni Connections** – Talk directly with peers and graduates.

---

## Getting Started (Frontend – Next.js)

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

Run the development server:

```bash
npm install
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Then open [http://localhost:3000](http://localhost:3000) in your browser.
You can start editing by modifying `app/page.tsx` — the page auto-updates as you save.

To learn more:

* [Next.js Documentation](https://nextjs.org/docs)
* [Learn Next.js](https://nextjs.org/learn)

Deploy easily with [Vercel](https://vercel.com/).

---

## 🏗️ Architecture & Tech Stack

---

### Frontend

<img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg" width="20"/> **Next.js 15** with App Router for SSR & routing

<img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" width="20"/> **React 19** + <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" width="20"/> **TypeScript** for type-safe development

<img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/styledcomponents/styledcomponents-original.svg" width="20"/> **Styled Components** for CSS-in-JS styling

<img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redux/redux-original.svg" width="20"/> **Redux Toolkit** for global state management

<img src="https://raw.githubusercontent.com/simple-icons/simple-icons/develop/icons/framer.svg" width="20"/> **Framer Motion** for animations

<img src="https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdna%2FFISsJ%2FbtquotFH0Kb%2FAAAAAAAAAAAAAAAAAAAAAMbSSx--YREm5gFOUKcd5JLLkyAYBWIBpBFNGCDf9okB%2Fimg.png%3Fcredential%3DyqXZFxpELC7KVnFOS48ylbz2pIh7yKj8%26expires%3D1759244399%26allow_ip%3D%26allow_referer%3D%26signature%3D%252FoJVO83EwDQpOlI2YQCISt7OJvg%253D" width="20"/> **Recharts** for data visualization

### Backend & Database

<img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg" width="20"/> **Next.js API Routes** for serverless backend

<img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/spring/spring-original.svg" width="20"/> **Spring Boot** API server

<img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg" width="20"/> **PostgreSQL** + <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/prisma/prisma-original.svg" width="20"/> **Prisma ORM**

<img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/google/google-original.svg" width="20"/> **NextAuth.js** (Google OAuth + credentials)

<img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/googlecloud/googlecloud-original.svg" width="20"/> **Google Cloud Storage** for file uploads



### Authentication & Security
- **NextAuth.js** with Prisma adapter for session management
- **Google OAuth 2.0** integration for social login
- **Credentials provider** with bcrypt password hashing
- **Database sessions** for secure session storage

---

## 🎯 Core Features & Implementation

### 1. Spring Boot API Integration

**Implementation Details:**
- **Axios Configuration** (`src/lib/api.ts`):
  ```typescript
  const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_BASE_URL, // Spring Boot server
    withCredentials: true,
  });
  
  // Request interceptor for JWT tokens
  api.interceptors.request.use((config) => {
    const token = getAccessToken();
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  });
  
  // Response interceptor for token refresh
  api.interceptors.response.use(
    (res) => res,
    async (error) => {
      if (error.response?.status === 401 && !originalRequest._retry) {
        const { accessToken } = await refreshAccessToken();
        setAccessToken(accessToken);
        return api(originalRequest);
      }
      return Promise.reject(error);
    }
  );
  ```

- **Authentication API Calls**:
  - Login: `POST /api/auth/login`
  - Signup: `POST /api/auth/signup`
  - Logout: `POST /api/auth/logout`
  - Token Refresh: `POST /api/auth/refresh`
  - Social Login: `POST /api/auth/social-login`

- **File Upload API**:
  - Resume Upload: `POST /api/upload/resume`
  - Personal Info: `POST /api/uploadPersonalInfo`
  - User Data: `GET /api/upload/{userId}`

### 2. User Authentication System

**Implementation Details:**
- **NextAuth.js Configuration** (`src/lib/social-auth/googleAuth.ts`):
  ```typescript
  export const authConfig = {
    adapter: PrismaAdapter(prisma),
    providers: [
      GoogleProvider({
        clientId: process.env.GOOGLE_CLIENT_ID!,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      }),
      CredentialsProvider({
        // Custom email/password authentication
        async authorize(credentials) {
          const user = await prisma.user.findUnique({
            where: { email: credentials.email },
          });
          const isValid = await bcrypt.compare(credentials.password, user.password);
          return isValid ? user : null;
        },
      }),
    ],
    session: { strategy: "database" },
    callbacks: {
      async session({ session, user }) {
        session.user.id = user.id;
        return session;
      },
    },
  };
  ```

- **Database Schema** (`prisma/schema.prisma`):
  ```prisma
  model User {
    id             String   @id @default(uuid())
    email          String   @unique
    firstname      String?
    lastname       String?
    password       String?
    role           String   @default("USER")
    emailVerified  DateTime?
    image          String?
    name           String?
    createdAt      DateTime @default(now())
    updatedAt      DateTime @updatedAt
    accounts       Account[]
    sessions       Session[]
  }
  ```

### 3. AI-Powered College Recommendation System

**Implementation Details:**
- **Redux State Management** (`src/store/demoSchoolsSlice.ts`):
  ```typescript
  export const fetchDemoSchools = createAsyncThunk(
    "allSchools/fetch",
    async () => {
      const response = await fetch("/mock_recommendations.json");
      const data = await response.json();
      return data.map((item: any) => ({
        ...item,
        school_name: item.school_name || item.name,
      }));
    }
  );
  ```

- **School Recommendation Component** (`src/components/recommended/RecommendedSchoolList.tsx`):
  - Fetches personalized recommendations based on user profile
  - Displays schools sorted by matching score
  - Integrates with user session for personalized results

- **Matching Score Visualization** (`src/components/dashboard/school/MatchingScoreChart.tsx`):
  ```typescript
  const normalize = (value: number, max: number): number => {
    if (value === 0 && max === 0) return 10;
    if (max === 0) return 0;
    return Math.min((value / max) * 10, 10);
  };
  
  // Radar chart implementation with Recharts
  <RadarChart cx="50%" cy="50%" outerRadius="80%" data={chartData}>
    <PolarGrid />
    <PolarAngleAxis dataKey="subject" tick={<CustomTick />} />
    <PolarRadiusAxis angle={30} domain={[0, 10]} />
    <Radar dataKey="score" stroke="#765127" fill="#765127" fillOpacity={0.6} />
  </RadarChart>
  ```

### 4. Application Flow Management

**Implementation Details:**
- **Admission Flow Controller** (`src/components/AdmissionFlow.tsx`):
  ```typescript
  const AdmissionFlow = () => {
    const [step, setStep] = useState<Step>("resume");
    const { data: session, status } = useSession();
    
    useEffect(() => {
      const resumeUploaded = localStorage.getItem("resumeUploaded") === "true";
      const personalInfoCompleted = localStorage.getItem("personalInfoCompleted") === "true";
      const recommendCompleted = localStorage.getItem("recommendCompleted") === "true";
      
      if (fromPayment || paymentCompleted) {
        setStep("dashboard");
      } else if (!resumeUploaded) {
        setStep("resume");
      } else if (!personalInfoCompleted) {
        setStep("personalInfo");
      } else if (!recommendCompleted || !cartCompleted || !paymentCompleted) {
        setStep("continue");
      } else {
        setStep("dashboard");
      }
    }, [session, status]);
  };
  ```

- **Step-based Navigation**:
  - Resume Upload → Personal Info → Recommendations → Cart → Payment → Dashboard
  - Local storage persistence for user progress
  - Conditional rendering based on completion status

### 5. Resume Management System

**Implementation Details:**
- **Google Cloud Storage Integration** (`src/app/api/resume/route.ts`):
  ```typescript
  export async function GET(request: Request) {
    const storage = new Storage({
      projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
    });
    
    const bucket = storage.bucket(bucketName);
    const fileName = `resumes/${userId}/resume`;
    const file = bucket.file(fileName);
    
    const [signedUrl] = await file.getSignedUrl({
      version: 'v4',
      action: 'read',
      expires: Date.now() + 15 * 60 * 1000, // 15 minutes
    });
    
    return NextResponse.json({
      name: metadata.metadata?.originalName || 'resume',
      url: signedUrl,
      contentType: metadata.contentType,
    });
  }
  ```

- **File Upload Handling**:
  - Secure file storage in Google Cloud Storage
  - Signed URL generation for secure access
  - User-specific file organization (`resumes/${userId}/resume`)

### 6. Essay Management System

**Implementation Details:**
- **Essay List Component** (`src/components/dashboard/school/EssayList.tsx`):
  ```typescript
  interface EssayListProps {
    commonApp: string;
    supplementary: { [key: string]: string };
  }
  
  export default function EssayList({ commonApp, supplementary }: EssayListProps) {
    return (
      <Wrapper>
        <Title>Essays</Title>
        <EssayButton>
          <strong>Common App Essay</strong>
          <SubText>{commonApp || "Obstacle or Challenge"}</SubText>
        </EssayButton>
        
        {Object.entries(supplementary).map(([key, value], index) => (
          <EssayButton key={key}>
            <strong>{`Supplementary Essay ${index + 1}`}</strong>
            <SubText>{value || "Optional Prompt"}</SubText>
          </EssayButton>
        ))}
        
        <GoButton>go to essay</GoButton>
      </Wrapper>
    );
  }
  ```

### 7. Shopping Cart & Payment System

**Implementation Details:**
- **Redux Cart Management** (`src/store/cartSlice.ts`):
  ```typescript
  const cartSlice = createSlice({
    name: "cart",
    initialState: { items: [], total: 0 },
    reducers: {
      addToCart: (state, action: PayloadAction<School>) => {
        const exists = state.items.find(item => item.school_name === action.payload.school_name);
        if (!exists) {
          state.items.push(action.payload);
          state.total += 100; // $100 per college
        }
      },
      removeFromCart: (state, action: PayloadAction<string>) => {
        const index = state.items.findIndex(item => item.school_name === action.payload);
        if (index !== -1) {
          state.items.splice(index, 1);
          state.total -= 100;
        }
      },
    },
  });
  ```

- **Pricing Structure**:
  - University Recommendation: $10 (5 safety colleges free)
  - Resume Builder: $15
  - Essay Helper: $100 per college

### 8. Dashboard & Progress Tracking

**Implementation Details:**
- **Progress State Management** (`src/store/dashboard/progressSlice.ts`):
  - Tracks application progress for each selected school
  - Calculates completion percentages
  - Manages essay writing status

- **Dashboard Visualization** (`src/components/dashboard/Dashboard.tsx`):
  ```typescript
  const Dashboard = () => {
    const schools = useSelector((state: RootState) => state.progress);
    
    return (
      <CardWrapper>
        <TitleRow>
          <Image src={images["tori-face"]} alt="tori" width={95} height={90} />
          <Title>Dashboard</Title>
        </TitleRow>
        
        {schools.length > 0 ? (
          schools.map((school) => (
            <DashboardCard key={school.school_name} school={school} />
          ))
        ) : (
          <EmptyMessage>No schools to display yet.</EmptyMessage>
        )}
      </CardWrapper>
    );
  };
  ```

### 9. Responsive Design & Styling

**Implementation Details:**
- **Styled Components Theme System** (`src/styles/theme.ts`):
  ```typescript
  export const theme = {
    colors: {
      primary: "#4e3b26",
      textPrimary: "#2d1b0e",
      textSecondary: "#6b7280",
      white: "#ffffff",
    },
    fonts: {
      primary: "var(--font-noto-sans)",
      secondary: "var(--font-fredoka)",
    },
  };
  ```

- **Font Optimization** (`src/app/layout.tsx`):
  ```typescript
  const notoSansKr = Noto_Sans_KR({
    subsets: ["latin"],
    weight: ["400", "500", "700"],
    variable: "--font-noto-sans",
  });
  
  const baloo2 = Fredoka({
    subsets: ["latin"],
    weight: ["400", "500", "600", "700"],
    variable: "--font-fredoka",
  });
  ```

---

## 🗂️ Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── (auth)/            # Authentication pages
│   ├── api/               # API routes
│   ├── dashboard/         # Dashboard pages
│   ├── cart/              # Shopping cart
│   ├── pricing/           # Pricing page
│   └── profile/           # User profile
├── components/            # Reusable components
│   ├── auth/              # Authentication components
│   ├── cart/              # Cart components
│   ├── common/            # Common UI components
│   ├── dashboard/         # Dashboard components
│   └── recommended/       # Recommendation components
├── lib/                   # Utility libraries
│   ├── auth/              # Authentication utilities
│   └── social-auth/       # Social authentication
├── store/                 # Redux store
├── styles/                # Global styles and themes
└── types/                 # TypeScript type definitions
```

---

## 🔧 Environment Variables

Create a `.env.local` file with the following variables:

```env
# Database
DATABASE_URL="postgresql://username:password@localhost:5432/dotori_db"

# NextAuth
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-nextauth-secret-key"

# Google OAuth
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"

# Google Cloud Storage
NEXT_PUBLIC_PROJECT_ID="your-gcp-project-id"
NEXT_PUBLIC_STORAGE_BUCKET_NAME="your-gcs-bucket-name"

# Backend API
NEXT_PUBLIC_API_BASE_URL="http://localhost:8080"
NEXT_PUBLIC_API_URL="http://localhost:8080"
```

**⚠️ Security Note:** Never commit actual credentials to version control. Use placeholder values in your `.env.local` file and keep real credentials secure.

---

## Members

* **Jehoon Park** — Founder / SWE (Univ. of Minnesota Twin Cities)
* **Jewook Park** — Co-Founder / SWE (Georgia Tech)
* **Seoyoon Ham** — Co-Founder / Data Engineer (NYU)
* **Jiyoon Shin** — Co-Founder / Data Engineer (Yonsei Univ.)

---

## Contact

* Company: **dotori**
* Email: **[dotoripack@gmail.com](mailto:dotoripack@gmail.com)**
* Location: Minneapolis
* LinkedIn: [Dotori LinkedIn](https://www.linkedin.com/company/dotoripack/about/?viewAsMember=true)

