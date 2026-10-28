import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

const SEED_BOOKS: any[] = [
  {
    id: 101,
    title: "The Amazing Spider-Man: Blue",
    author: "Jeph Loeb & Tim Sale",
    category: "Superhero",
    level: "Accessible",
    logo: "🕷️",
    year: 2002,
    available: true,
    rating: 4.9,
    isbn: "978-0785110712",
    coverImage: "https://i.pinimg.com/736x/fc/b4/59/fcb4591185ab08498801d107f9af2ee8--spiderman-comic-amazing-spiderman.jpg",
    description: "Widely recognized and accessible: Peter Parker recounts his early days as Spider-Man and his poignant, unforgettable love story with Gwen Stacy."
  },
  {
    id: 102,
    title: "Batman: The Dark Knight Returns",
    author: "Frank Miller",
    category: "Dark Hero",
    level: "Advanced",
    logo: "🦇",
    year: 1986,
    available: true,
    rating: 4.9,
    isbn: "978-1563893421",
    coverImage: "https://static.dc.com/2023-04/press_040723_BM_Cv135_13511.jpg",
    description: "Iconic superhero narratives with varied language styles: An aged Bruce Wayne emerges from retirement to restore justice to a dystopian, crime-ravaged Gotham City."
  },
  {
    id: 103,
    title: "Watchmen",
    author: "Alan Moore & Dave Gibbons",
    category: "Graphic Novel",
    level: "Advanced / Native-Level",
    logo: "⏳",
    year: 1986,
    available: true,
    rating: 5.0,
    isbn: "978-0930289232",
    coverImage: "https://m.media-amazon.com/images/M/MV5BMjc5NGFlMzMtZjkwZS00MzliLTg5NzktZDYzNGNhNjdjNzAzXkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg",
    description: "Complex themes and vocabulary: A ground-breaking Hugo Award-winning deconstruction of superheroes set during a tense Cold War alternate reality."
  },
  {
    id: 104,
    title: "Peanuts",
    author: "Charles M. Schulz",
    category: "Classic Comic Strip",
    level: "Beginner",
    logo: "🥜",
    year: 1950,
    available: true,
    rating: 4.9,
    isbn: "978-1782761563",
    coverImage: "https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=800&q=80",
    description: "Simple dialogue and everyday vocabulary: The timeless adventures of Charlie Brown, Snoopy, Linus, and the beloved Peanuts gang."
  },
  {
    id: 107,
    title: "Diary of a Wimpy Kid",
    author: "Jeff Kinney",
    category: "Illustrated Fiction",
    level: "Beginner / Intermediate",
    logo: "📓",
    year: 2007,
    available: true,
    rating: 4.8,
    isbn: "978-0141324906",
    coverImage: "https://covers.openlibrary.org/b/isbn/9780141324906-L.jpg",
    description: "Text-heavy but simple, great for cultural context: Greg Heffley documents middle school survival, friend dynamics, and the notorious cheese touch."
  },
  {
    id: 109,
    title: "Bone",
    author: "Jeff Smith",
    category: "Fantasy Adventure",
    level: "Intermediate",
    logo: "🦴",
    year: 1991,
    available: true,
    rating: 4.9,
    isbn: "978-1888422009",
    coverImage: "https://covers.openlibrary.org/b/isbn/9781888422009-L.jpg",
    description: "Easy-to-follow fantasy adventure: Fone Bone and his cousins get run out of Boneville and find themselves in a mysterious valley teeming with monsters and magic."
  },
  {
    id: 110,
    title: "Calvin and Hobbes",
    author: "Bill Watterson",
    category: "Classic Comic Strip",
    level: "Intermediate",
    logo: "🐯",
    year: 1985,
    available: true,
    rating: 5.0,
    isbn: "978-0836220889",
    coverImage: "https://covers.openlibrary.org/b/isbn/9780836220889-L.jpg",
    description: "Clever humor and philosophical themes: The imaginative escapades of an inquisitive six-year-old boy and his sardonic stuffed tiger come to life."
  },
  {
    id: 111,
    title: "The Sandman",
    author: "Neil Gaiman",
    category: "Dark Fantasy",
    level: "Advanced / Native-Level",
    logo: "🌙",
    year: 1989,
    available: true,
    rating: 5.0,
    isbn: "978-1401225759",
    coverImage: "https://m.media-amazon.com/images/S/pv-target-images/81cbe8e7855fe8db91148c6003a14a53825b9652036f923e85d69852f3ee6f11.jpg",
    description: "Rich, literary storytelling: Morpheus, Lord of the Dreaming, embarks on a dark, mythic journey traversing world mythology, folklore, and occult history."
  },
  {
    id: 112,
    title: "All-Star Superman",
    author: "Grant Morrison & Frank Quitely",
    category: "Superhero",
    level: "Accessible",
    logo: "🦸",
    year: 2006,
    available: true,
    rating: 4.9,
    isbn: "978-1401232375",
    coverImage: "https://covers.openlibrary.org/b/isbn/9781401232375-L.jpg",
    description: "Widely recognized and accessible: Facing terminal cellular over-saturation, Superman embarks on twelve heroic labors to safeguard humanity's future."
  },
  {
    id: 113,
    title: "X-Men: Days of Future Past",
    author: "Chris Claremont & John Byrne",
    category: "Superhero",
    level: "Accessible",
    logo: "🧬",
    year: 1981,
    available: true,
    rating: 4.8,
    isbn: "978-0785164531",
    coverImage: "https://covers.openlibrary.org/b/isbn/9780785164531-L.jpg",
    description: "Widely recognized and accessible: Mutants face total annihilation under Sentinel supremacy, triggering a desperate time-travel quest to save history."
  },
  {
    id: 114,
    title: "Ms. Marvel: No Normal",
    author: "G. Willow Wilson & Adrian Alphona",
    category: "Superhero",
    level: "Accessible",
    logo: "⚡",
    year: 2014,
    available: true,
    rating: 4.8,
    isbn: "978-0785190219",
    coverImage: "https://covers.openlibrary.org/b/isbn/9780785190219-L.jpg",
    description: "Widely recognized and accessible: Kamala Khan, an ordinary teenager from Jersey City, discovers extraordinary shape-shifting polymorph powers."
  },
  {
    id: 115,
    title: "The Simpsons Comics",
    author: "Matt Groening & Bongo Comics",
    category: "Humor & Satire",
    level: "Accessible",
    logo: "🍩",
    year: 1993,
    available: true,
    rating: 4.7,
    isbn: "978-0060953782",
    coverImage: "https://static.simpsonswiki.com/images/0/0d/Simpsons_Comics_245.jpg",
    description: "Humorous and culturally rich: Laugh-out-loud satirical adventures featuring Homer, Bart, Lisa, and the delightfully eccentric citizens of Springfield."
  },
  {
    id: 117,
    title: "Iron Man: Extremis",
    author: "Warren Ellis & Adi Granov",
    category: "Superhero",
    level: "Accessible",
    logo: "🦾",
    year: 2005,
    available: true,
    rating: 4.8,
    isbn: "978-0785123385",
    coverImage: "https://covers.openlibrary.org/b/isbn/9780785123385-L.jpg",
    description: "Tony Stark re-engineers his biological armor interface to battle cyber-enhanced terrorists as the Invincible Iron Man."
  },
  {
    id: 118,
    title: "The Incredible Hulk: Planet Hulk",
    author: "Greg Pak & Carlo Pagulayan",
    category: "Superhero",
    level: "Accessible",
    logo: "🟢",
    year: 2006,
    available: true,
    rating: 4.9,
    isbn: "978-0785120124",
    coverImage: "https://covers.openlibrary.org/b/isbn/9780785120124-L.jpg",
    description: "Exiled into cosmic orbit by the Illuminati, the Green Goliath is forced into gladiatorial combat on the alien world of Sakaar."
  },
  {
    id: 119,
    title: "Thor: God of Thunder - The God Butcher",
    author: "Jason Aaron & Esad Ribić",
    category: "Superhero",
    level: "Accessible",
    logo: "🔨",
    year: 2013,
    available: true,
    rating: 4.9,
    isbn: "978-0785168423",
    coverImage: "https://i.pinimg.com/originals/dc/4c/5a/dc4c5afa50e7b56041ccdfcb0bf08687.jpg",
    description: "Across past, present, and future, the Mighty Thor battles Gorr the God Butcher to save gods across all realms."
  }
];

/* eslint-disable @typescript-eslint/no-explicit-any */
const mockRestApiPlugin = () => ({
  name: 'mock-rest-api',
  configureServer(server: any) {
    server.middlewares.use((req: any, res: any, next: any) => {
      if (!req.url?.startsWith('/api/')) {
        return next();
      }

      const parsedUrl = new URL(req.url, `http://${req.headers.host || 'localhost'}`);
      const pathname = parsedUrl.pathname;
      const params = parsedUrl.searchParams;

      res.setHeader('Content-Type', 'application/json');
      res.setHeader('Access-Control-Allow-Origin', '*');
      res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS');
      res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With');

      if (req.method === 'OPTIONS') {
        res.statusCode = 204;
        return res.end();
      }

      // GET /api/books
      if (req.method === 'GET' && pathname === '/api/books') {
        const search = (params.get('search') || '').trim().toLowerCase();
        const category = params.get('category') || 'All';
        const author = params.get('author') || 'All';
        const available = params.get('available') || 'All';

        const filtered = SEED_BOOKS.filter((b) => {
          const matchesSearch = !search ||
            b.title.toLowerCase().includes(search) ||
            b.author.toLowerCase().includes(search) ||
            b.description.toLowerCase().includes(search);
          const matchesCategory = category === 'All' || b.category.toLowerCase() === category.toLowerCase();
          const matchesAuthor = author === 'All' || b.author.toLowerCase() === author.toLowerCase();
          let matchesAvail = true;
          if (available === 'Available' || available === 'true') matchesAvail = b.available === true;
          else if (available === 'Unavailable' || available === 'false') matchesAvail = b.available === false;
          return matchesSearch && matchesCategory && matchesAuthor && matchesAvail;
        });

        res.statusCode = 200;
        return res.end(JSON.stringify({
          success: true,
          count: filtered.length,
          total: SEED_BOOKS.length,
          books: filtered
        }));
      }

      // POST /api/books (Add a new book - Requirement b)
      if (req.method === 'POST' && pathname === '/api/books') {
        let body = '';
        req.on('data', (chunk: any) => { body += chunk; });
        req.on('end', () => {
          try {
            const data = JSON.parse(body || '{}');
            const maxId = SEED_BOOKS.reduce((max, b) => Math.max(max, Number(b.id) || 100), 100);
            const newBook = {
              id: maxId + 1,
              title: data.title || "Untitled Book",
              author: data.author || "Unknown Author",
              category: data.category || "General Literature",
              year: Number(data.year) || 2024,
              available: data.available !== undefined ? Boolean(data.available) : true,
              rating: Number(data.rating) || 4.5,
              isbn: data.isbn || `978-818468${maxId + 1}`,
              pages: Number(data.pages) || 350,
              coverImage: data.coverImage || "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=600&q=80",
              description: data.description || "A recently added literary addition."
            };
            SEED_BOOKS.unshift(newBook);
            res.statusCode = 201;
            return res.end(JSON.stringify({ success: true, message: "Book created successfully", book: newBook }));
          } catch {
            res.statusCode = 400;
            return res.end(JSON.stringify({ success: false, error: "Invalid JSON payload" }));
          }
        });
        return;
      }

      // GET /api/books/:id
      const bookDetailMatch = pathname.match(/^\/api\/books\/([^/]+)$/);
      if (req.method === 'GET' && bookDetailMatch) {
        const id = bookDetailMatch[1];
        const book = SEED_BOOKS.find((b) => String(b.id) === String(id) || String(b.id) === String(Number(id) - 100));
        if (!book) {
          res.statusCode = 404;
          return res.end(JSON.stringify({ success: false, error: `Book #${id} not found` }));
        }
        res.statusCode = 200;
        return res.end(JSON.stringify({ success: true, book }));
      }

      // PUT/PATCH /api/books/:id (Update book info - Requirement c)
      if ((req.method === 'PUT' || req.method === 'PATCH') && bookDetailMatch) {
        const id = bookDetailMatch[1];
        let body = '';
        req.on('data', (chunk: any) => { body += chunk; });
        req.on('end', () => {
          try {
            const data = JSON.parse(body || '{}');
            const index = SEED_BOOKS.findIndex((b) => String(b.id) === String(id) || String(b.id) === String(Number(id) - 100));
            if (index === -1) {
              res.statusCode = 404;
              return res.end(JSON.stringify({ success: false, error: `Book #${id} not found` }));
            }
            SEED_BOOKS[index] = { ...SEED_BOOKS[index], ...data, id: SEED_BOOKS[index].id };
            res.statusCode = 200;
            return res.end(JSON.stringify({ success: true, message: "Book updated successfully", book: SEED_BOOKS[index] }));
          } catch {
            res.statusCode = 400;
            return res.end(JSON.stringify({ success: false, error: "Invalid JSON" }));
          }
        });
        return;
      }

      // DELETE /api/books/:id (Delete book - Requirement d)
      if (req.method === 'DELETE' && bookDetailMatch) {
        const id = bookDetailMatch[1];
        const index = SEED_BOOKS.findIndex((b) => String(b.id) === String(id) || String(b.id) === String(Number(id) - 100));
        if (index === -1) {
          res.statusCode = 404;
          return res.end(JSON.stringify({ success: false, error: `Book #${id} not found` }));
        }
        const deleted = SEED_BOOKS.splice(index, 1)[0];
        res.statusCode = 200;
        return res.end(JSON.stringify({ success: true, message: `Book "${deleted.title}" deleted`, deletedId: deleted.id }));
      }

      // POST /api/borrowings (Create borrowing record - Requirement e)
      if (req.method === 'POST' && pathname === '/api/borrowings') {
        let body = '';
        req.on('data', (chunk: any) => { body += chunk; });
        req.on('end', () => {
          try {
            const data = JSON.parse(body || '{}');
            const bookIndex = SEED_BOOKS.findIndex((b) => String(b.id) === String(data.bookId));
            if (bookIndex !== -1) {
              SEED_BOOKS[bookIndex].available = false;
            }
            res.statusCode = 201;
            return res.end(JSON.stringify({
              success: true,
              message: "Borrowing record created",
              borrowing: {
                id: "BRW-" + Date.now(),
                bookId: data.bookId,
                borrowDate: new Date().toISOString().split('T')[0],
                dueDate: new Date(Date.now() + 14 * 86400000).toISOString().split('T')[0],
                status: "active"
              }
            }));
          } catch {
            res.statusCode = 400;
            return res.end(JSON.stringify({ success: false, error: "Invalid payload" }));
          }
        });
        return;
      }

      // PATCH /api/borrowings/:id/return (Update borrowing record to returned - Requirement e)
      const returnMatch = pathname.match(/^\/api\/borrowings\/([^/]+)\/return$/);
      if ((req.method === 'PATCH' || req.method === 'POST') && returnMatch) {
        const bookId = returnMatch[1];
        const bk = SEED_BOOKS.find((b) => String(b.id) === String(bookId));
        if (bk) bk.available = true;
        res.statusCode = 200;
        return res.end(JSON.stringify({ success: true, message: "Book returned successfully" }));
      }

      // PATCH /api/borrowings/:id/renew (Update borrowing record to renewed - Requirement e)
      const renewMatch = pathname.match(/^\/api\/borrowings\/([^/]+)\/renew$/);
      if ((req.method === 'PATCH' || req.method === 'POST') && renewMatch) {
        res.statusCode = 200;
        return res.end(JSON.stringify({ success: true, message: "Book renewed +7 days" }));
      }

      // GET /api/members/current
      if (req.method === 'GET' && (pathname === '/api/members/current' || pathname.startsWith('/api/members/'))) {
        res.statusCode = 200;
        return res.end(JSON.stringify({
          success: true,
          member: {
            memberId: "SK-LIB-101",
            name: "Member",
            email: "member@sklibrary.org",
            phone: "+91 98765 43210",
            branch: "SK Central Library, Chennai",
            membershipTier: "Gold Scholar",
            joinedDate: "2024-01-15",
            maxBooksAllowed: 5,
            activeLoansCount: 0,
            preferredCategories: ["Superhero", "Graphic Novel", "Sci-Fi Comic", "Dark Hero"]
          }
        }));
      }

      // GET /api/recommendations
      if (req.method === 'GET' && pathname === '/api/recommendations') {
        const category = params.get('category') || 'Superhero';
        const recs = SEED_BOOKS.filter(b => b.category.toLowerCase() === category.toLowerCase()).slice(0, 3);
        res.statusCode = 200;
        return res.end(JSON.stringify({
          success: true,
          recommendations: recs.map((r, i) => ({
            ...r,
            recommendationReason: `Top match in ${category} comics`,
            matchScore: `${95 - i * 4}%`
          }))
        }));
      }

      // ===== Experiment 4: Auth Endpoints =====

      // POST /api/auth/login — Requirement a
      if (req.method === 'POST' && pathname === '/api/auth/login') {
        let body = '';
        req.on('data', (chunk: any) => { body += chunk; });
        req.on('end', () => {
          try {
            const data = JSON.parse(body || '{}');
            const id = (data.identifier || '').trim().toLowerCase();
            const pwd = (data.password || '').trim();
            if (!id || !pwd || pwd.length < 4) {
              res.statusCode = 401;
              return res.end(JSON.stringify({ success: false, error: 'Invalid credentials' }));
            }
            const user = {
              memberId: id.includes('@') ? 'SK-LIB-999' : id.toUpperCase(),
              email: id.includes('@') ? id : `${id}@library.org`,
              name: 'Member',
              role: 'Member',
              membershipTier: 'Gold Scholar'
            };
            if (id === 'member@sklibrary.org' || id === 'sk-lib-101' || id === 'ak-lib-101') {
              user.memberId = 'SK-LIB-101';
              user.email = 'member@sklibrary.org';
            }
            const token = `srv_${user.memberId}_${Date.now().toString(36)}`;
            res.statusCode = 200;
            return res.end(JSON.stringify({ success: true, message: `Welcome back, ${user.name}!`, user, token, expiresIn: 900 }));
          } catch {
            res.statusCode = 400;
            return res.end(JSON.stringify({ success: false, error: 'Bad request' }));
          }
        });
        return;
      }

      // POST /api/auth/logout — Requirement e
      if (req.method === 'POST' && pathname === '/api/auth/logout') {
        res.statusCode = 200;
        return res.end(JSON.stringify({ success: true, message: 'Logged out successfully. Session invalidated.' }));
      }

      // POST /api/auth/refresh — Requirement f
      if (req.method === 'POST' && pathname === '/api/auth/refresh') {
        res.statusCode = 200;
        return res.end(JSON.stringify({ success: true, message: 'Token refreshed successfully.' }));
      }

      next();
    });
  }
});

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), mockRestApiPlugin()],
  build: {
    chunkSizeWarningLimit: 600,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('react-router-dom') || id.includes('react-dom') || id.includes('react')) {
              return 'vendor-react';
            }
            if (id.includes('@reduxjs/toolkit') || id.includes('react-redux')) {
              return 'vendor-redux';
            }
            if (id.includes('axios')) {
              return 'vendor-axios';
            }
            if (id.includes('zustand')) {
              return 'vendor-zustand';
            }
            return 'vendor-libs';
          }
        }
      }
    }
  }
});

