// Enhanced Application JavaScript with Advanced Features
// Author: Frédéric Mirindi
// Description: Advanced portfolio website with AI integration and interactive features

class AdvancedPortfolio {
    constructor() {
        this.currentPage = 'home';
        this.aiAssistant = null;
        this.theme = localStorage.getItem('theme') || 'light';
        this.isLoading = true;
        this.animations = new Map();
        this.collaborators = new Map();
        this.init();
    }

    async init() {
        await this.showLoadingScreen();
        this.initializeComponents();
        this.setupEventListeners();
        this.initializeAnimations();
        this.setupParticles();
        this.initializeAIAssistant();
        await this.hideLoadingScreen();
    }

    async showLoadingScreen() {
        const loadingScreen = document.getElementById('loading-screen');
        const progressBar = document.getElementById('loading-progress-bar');
        const statusText = document.getElementById('loading-status');
        
        const steps = [
            { progress: 20, status: 'Loading neural networks...' },
            { progress: 40, status: 'Initializing AI assistant...' },
            { progress: 60, status: 'Setting up 3D visualizations...' },
            { progress: 80, status: 'Connecting collaboration tools...' },
            { progress: 100, status: 'Ready!' }
        ];

        for (const step of steps) {
            progressBar.style.width = `${step.progress}%`;
            statusText.textContent = step.status;
            await this.delay(800);
        }
    }

    async hideLoadingScreen() {
        const loadingScreen = document.getElementById('loading-screen');
        loadingScreen.classList.add('hidden');
        setTimeout(() => {
            loadingScreen.style.display = 'none';
        }, 500);
    }

    initializeComponents() {
        // Initialize theme
        this.applyTheme(this.theme);
        
        // Initialize navigation
        this.setupNavigation();
        
        // Initialize AI Assistant
        this.setupAIAssistant();
        
        // Initialize research tools
        this.setupResearchTools();
        
        // Initialize collaboration features
        this.setupCollaboration();
        
        // Initialize contact form
        this.setupSmartContactForm();
        
        // Initialize counters and metrics
        this.startCounterAnimations();
        
        // Initialize timeline
        this.setupTimeline();
    }

    setupEventListeners() {
        // Navigation
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const page = link.getAttribute('data-page');
                this.navigateToPage(page);
            });
        });

        // Theme toggle
        document.getElementById('theme-toggle')?.addEventListener('click', () => {
            this.toggleTheme();
        });

        // AI Assistant toggle
        document.getElementById('ai-assistant-toggle')?.addEventListener('click', () => {
            this.toggleAIAssistant();
        });

        // AI Assistant close
        document.getElementById('ai-panel-close')?.addEventListener('click', () => {
            this.toggleAIAssistant();
        });

        // AI Send message
        document.getElementById('ai-send-btn')?.addEventListener('click', () => {
            this.sendAIMessage();
        });

        // AI Input enter key
        document.getElementById('ai-input')?.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.sendAIMessage();
            }
        });

        // Research tool buttons
        document.getElementById('run-model')?.addEventListener('click', () => {
            this.runAIModel();
        });

        document.getElementById('run-forecast')?.addEventListener('click', () => {
            this.runEconomicForecast();
        });

        document.getElementById('run-sentiment')?.addEventListener('click', () => {
            this.runSentimentAnalysis();
        });

        document.getElementById('run-simulation')?.addEventListener('click', () => {
            this.runPolicySimulation();
        });

        // Timeline filters
        document.querySelectorAll('.timeline-filter').forEach(filter => {
            filter.addEventListener('click', (e) => {
                this.filterTimeline(e.target.getAttribute('data-filter'));
            });
        });

        // Contact form
        document.getElementById('smart-contact-form')?.addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleSmartContactForm();
        });

        // Message analysis
        document.getElementById('analyze-message')?.addEventListener('click', () => {
            this.analyzeContactMessage();
        });

        // Scroll effects
        window.addEventListener('scroll', () => {
            this.handleScroll();
        });

        // Resize handler
        window.addEventListener('resize', () => {
            this.handleResize();
        });
    }

    navigateToPage(pageName) {
        // Hide current page
        document.querySelectorAll('.page').forEach(page => {
            page.classList.remove('active');
        });

        // Show target page
        const targetPage = document.getElementById(pageName);
        if (targetPage) {
            targetPage.classList.add('active');
            this.currentPage = pageName;
        }

        // Update navigation
        document.querySelectorAll('.nav-link').forEach(link => {
            link.classList.remove('active');
        });
        
        const activeLink = document.querySelector(`[data-page="${pageName}"]`);
        if (activeLink) {
            activeLink.classList.add('active');
        }

        // Initialize page-specific features
        this.initializePageFeatures(pageName);

        // Scroll to top
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    initializePageFeatures(pageName) {
        switch (pageName) {
            case 'research-lab':
                this.initialize3DResearchLab();
                break;
            case 'publications':
                this.initializePublicationsSearch();
                break;
            case 'ai-tools':
                this.initializeAITools();
                break;
            case 'collaboration':
                this.initializeCollaborationSpace();
                break;
            case 'timeline':
                this.initialize3DTimeline();
                break;
        }
    }

    toggleTheme() {
        this.theme = this.theme === 'light' ? 'dark' : 'light';
        this.applyTheme(this.theme);
        localStorage.setItem('theme', this.theme);
    }

    applyTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        const themeIcon = document.querySelector('.theme-icon');
        if (themeIcon) {
            themeIcon.textContent = theme === 'light' ? '🌙' : '☀️';
        }
    }

    toggleAIAssistant() {
        const panel = document.getElementById('ai-assistant-panel');
        panel.classList.toggle('active');
        
        if (panel.classList.contains('active')) {
            this.focusAIInput();
        }
    }

    focusAIInput() {
        setTimeout(() => {
            document.getElementById('ai-input')?.focus();
        }, 300);
    }

    async sendAIMessage() {
        const input = document.getElementById('ai-input');
        const message = input.value.trim();
        
        if (!message) return;

        // Add user message to conversation
        this.addMessageToConversation('user', message);
        
        // Clear input
        input.value = '';
        
        // Show typing indicator
        this.showAITyping();
        
        // Simulate AI response
        await this.delay(1000 + Math.random() * 2000);
        
        // Generate AI response
        const response = this.generateAIResponse(message);
        
        // Hide typing indicator and add response
        this.hideAITyping();
        this.addMessageToConversation('ai', response);
    }

    addMessageToConversation(sender, message) {
        const conversation = document.getElementById('ai-conversation');
        const messageDiv = document.createElement('div');
        messageDiv.className = `ai-message ${sender === 'user' ? 'user-message' : ''}`;
        
        messageDiv.innerHTML = `
            <div class="ai-avatar">${sender === 'user' ? '👤' : '🤖'}</div>
            <div class="ai-content">
                <p>${message}</p>
            </div>
        `;
        
        conversation.appendChild(messageDiv);
        conversation.scrollTop = conversation.scrollHeight;
    }

    showAITyping() {
        const conversation = document.getElementById('ai-conversation');
        const typingDiv = document.createElement('div');
        typingDiv.className = 'ai-message typing-indicator';
        typingDiv.id = 'typing-indicator';
        
        typingDiv.innerHTML = `
            <div class="ai-avatar">🤖</div>
            <div class="ai-content">
                <div class="typing-dots">
                    <span></span><span></span><span></span>
                </div>
            </div>
        `;
        
        conversation.appendChild(typingDiv);
        conversation.scrollTop = conversation.scrollHeight;
    }

    hideAITyping() {
        const typingIndicator = document.getElementById('typing-indicator');
        if (typingIndicator) {
            typingIndicator.remove();
        }
    }

    generateAIResponse(message) {
        const responses = {
            'research': 'I can help you explore my latest research in AI economics. What specific area interests you?',
            'collaboration': 'I\'d be happy to discuss collaboration opportunities. What kind of project do you have in mind?',
            'publications': 'Here are my recent publications on AI and economics. Would you like me to explain any specific paper?',
            'forecasting': 'My economic forecasting models use advanced LSTM networks. Would you like to see a demonstration?',
            'data': 'I work with various economic datasets. What type of analysis are you interested in?',
            'default': 'That\'s an interesting question! I\'m here to help with research, collaboration, and AI in economics. How can I assist you?'
        };

        const lowerMessage = message.toLowerCase();
        for (const [key, response] of Object.entries(responses)) {
            if (lowerMessage.includes(key)) {
                return response;
            }
        }
        
        return responses.default;
    }

    async runAIModel() {
        const button = document.getElementById('run-model');
        const results = document.getElementById('model-results');
        
        this.setButtonLoading(button, true);
        
        // Simulate model training
        await this.delay(3000);
        
        // Show results
        results.style.display = 'block';
        this.createModelVisualization();
        
        this.setButtonLoading(button, false);
    }

    async runEconomicForecast() {
        const button = document.getElementById('run-forecast');
        const results = document.getElementById('forecast-results');
        
        this.setButtonLoading(button, true);
        
        await this.delay(2000);
        
        results.style.display = 'block';
        this.createForecastChart();
        
        this.setButtonLoading(button, false);
    }

    async runSentimentAnalysis() {
        const button = document.getElementById('run-sentiment');
        const results = document.getElementById('sentiment-results');
        const text = document.getElementById('sentiment-text').value;
        
        if (!text.trim()) {
            alert('Please enter some text to analyze.');
            return;
        }
        
        this.setButtonLoading(button, true);
        
        await this.delay(1500);
        
        // Simulate sentiment analysis
        const sentiment = this.analyzeSentiment(text);
        this.displaySentimentResults(sentiment);
        
        results.style.display = 'block';
        this.setButtonLoading(button, false);
    }

    async runPolicySimulation() {
        const button = document.getElementById('run-simulation');
        const results = document.getElementById('simulation-results');
        
        this.setButtonLoading(button, true);
        
        await this.delay(2500);
        
        results.style.display = 'block';
        this.createSimulationChart();
        
        this.setButtonLoading(button, false);
    }

    setButtonLoading(button, loading) {
        if (loading) {
            button.classList.add('loading');
            button.disabled = true;
        } else {
            button.classList.remove('loading');
            button.disabled = false;
        }
    }

    analyzeSentiment(text) {
        // Simple sentiment analysis simulation
        const positiveWords = ['good', 'great', 'excellent', 'positive', 'growth', 'increase', 'profit', 'success'];
        const negativeWords = ['bad', 'poor', 'decline', 'decrease', 'loss', 'negative', 'crisis', 'recession'];
        
        const words = text.toLowerCase().split(/\s+/);
        let positiveCount = 0;
        let negativeCount = 0;
        
        words.forEach(word => {
            if (positiveWords.some(pw => word.includes(pw))) positiveCount++;
            if (negativeWords.some(nw => word.includes(nw))) negativeCount++;
        });
        
        const total = positiveCount + negativeCount;
        if (total === 0) {
            return { positive: 0.5, neutral: 1, negative: 0 };
        }
        
        return {
            positive: positiveCount / (positiveCount + negativeCount + 1),
            neutral: 1 / (positiveCount + negativeCount + 1),
            negative: negativeCount / (positiveCount + negativeCount + 1)
        };
    }

    displaySentimentResults(sentiment) {
        const meterFill = document.querySelector('.meter-fill');
        const sentimentValue = document.querySelector('.sentiment-value');
        const percentages = document.querySelectorAll('.sentiment-percent');
        
        const score = sentiment.positive;
        meterFill.style.width = `${score * 100}%`;
        
        if (score > 0.6) {
            sentimentValue.textContent = `Positive (${score.toFixed(2)})`;
            sentimentValue.className = 'sentiment-value positive';
        } else if (score < 0.4) {
            sentimentValue.textContent = `Negative (${score.toFixed(2)})`;
            sentimentValue.className = 'sentiment-value negative';
        } else {
            sentimentValue.textContent = `Neutral (${score.toFixed(2)})`;
            sentimentValue.className = 'sentiment-value neutral';
        }
        
        if (percentages.length >= 3) {
            percentages[0].textContent = `${Math.round(sentiment.positive * 100)}%`;
            percentages[1].textContent = `${Math.round(sentiment.neutral * 100)}%`;
            percentages[2].textContent = `${Math.round(sentiment.negative * 100)}%`;
        }
    }

    createModelVisualization() {
        const canvas = document.getElementById('model-viz-chart');
        if (!canvas) return;
        
        const ctx = canvas.getContext('2d');
        
        // Simple chart simulation
        new Chart(ctx, {
            type: 'line',
            data: {
                labels: ['Epoch 1', 'Epoch 2', 'Epoch 3', 'Epoch 4', 'Epoch 5'],
                datasets: [{
                    label: 'Training Loss',
                    data: [0.8, 0.6, 0.4, 0.25, 0.15],
                    borderColor: '#21808d',
                    backgroundColor: 'rgba(33, 128, 141, 0.1)',
                    tension: 0.4
                }, {
                    label: 'Validation Loss',
                    data: [0.85, 0.65, 0.45, 0.3, 0.2],
                    borderColor: '#32b8c6',
                    backgroundColor: 'rgba(50, 184, 198, 0.1)',
                    tension: 0.4
                }]
            },
            options: {
                responsive: true,
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
    }

    createForecastChart() {
        const canvas = document.getElementById('forecast-chart');
        if (!canvas) return;
        
        const ctx = canvas.getContext('2d');
        
        // Generate forecast data
        const historical = [2.1, 2.3, 1.9, 2.5, 2.2, 2.8];
        const forecast = [2.6, 2.4, 2.7, 2.9, 3.1, 2.8];
        
        new Chart(ctx, {
            type: 'line',
            data: {
                labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
                datasets: [{
                    label: 'Historical Data',
                    data: [...historical, null, null, null, null, null, null],
                    borderColor: '#21808d',
                    backgroundColor: 'rgba(33, 128, 141, 0.1)',
                    tension: 0.4
                }, {
                    label: 'Forecast',
                    data: [null, null, null, null, null, null, ...forecast],
                    borderColor: '#f5576c',
                    backgroundColor: 'rgba(245, 87, 108, 0.1)',
                    tension: 0.4,
                    borderDash: [5, 5]
                }]
            },
            options: {
                responsive: true,
                scales: {
                    y: {
                        beginAtZero: false,
                        title: {
                            display: true,
                            text: 'GDP Growth (%)'
                        }
                    }
                }
            }
        });
    }

    createSimulationChart() {
        const canvas = document.getElementById('simulation-chart');
        if (!canvas) return;
        
        const ctx = canvas.getContext('2d');
        
        new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ['GDP', 'Employment', 'Inflation', 'Investment', 'Consumption'],
                datasets: [{
                    label: 'Policy Impact (%)',
                    data: [1.2, 0.8, -0.3, 1.5, 0.6],
                    backgroundColor: [
                        '#21808d',
                        '#32b8c6',
                        '#f5576c',
                        '#4facfe',
                        '#667eea'
                    ]
                }]
            },
            options: {
                responsive: true,
                scales: {
                    y: {
                        beginAtZero: true,
                        title: {
                            display: true,
                            text: 'Impact (%)'
                        }
                    }
                }
            }
        });
    }

    startCounterAnimations() {
        const counters = document.querySelectorAll('.stat-number');
        
        const observerOptions = {
            threshold: 0.5,
            rootMargin: '0px 0px -100px 0px'
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.animateCounter(entry.target);
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);
        
        counters.forEach(counter => observer.observe(counter));
    }

    animateCounter(element) {
        const target = parseInt(element.getAttribute('data-target'));
        const duration = 2000;
        const startTime = performance.now();
        
        const animate = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            // Easing function
            const easeOutQuart = 1 - Math.pow(1 - progress, 4);
            const currentValue = Math.floor(target * easeOutQuart);
            
            element.textContent = currentValue;
            
            if (progress < 1) {
                requestAnimationFrame(animate);
            } else {
                element.textContent = target;
            }
        };
        
        requestAnimationFrame(animate);
    }

    setupParticles() {
        if (typeof particlesJS !== 'undefined') {
            particlesJS('particles-js', {
                particles: {
                    number: {
                        value: 80,
                        density: {
                            enable: true,
                            value_area: 800
                        }
                    },
                    color: {
                        value: '#21808d'
                    },
                    shape: {
                        type: 'circle'
                    },
                    opacity: {
                        value: 0.1,
                        random: true
                    },
                    size: {
                        value: 3,
                        random: true
                    },
                    line_linked: {
                        enable: true,
                        distance: 150,
                        color: '#21808d',
                        opacity: 0.1,
                        width: 1
                    },
                    move: {
                        enable: true,
                        speed: 2,
                        direction: 'none',
                        random: false,
                        straight: false,
                        out_mode: 'out',
                        bounce: false
                    }
                },
                interactivity: {
                    detect_on: 'canvas',
                    events: {
                        onhover: {
                            enable: true,
                            mode: 'repulse'
                        },
                        onclick: {
                            enable: true,
                            mode: 'push'
                        },
                        resize: true
                    }
                },
                retina_detect: true
            });
        }
    }

    setupTimeline() {
        // Timeline data
        this.timelineData = [
            {
                year: 2025,
                type: 'research',
                title: 'PhD Candidate - Economics & Econometrics',
                description: 'University of Manitoba',
                icon: '🎓'
            },
            {
                year: 2024,
                type: 'publications',
                title: 'AI-Powered Economic Forecasting',
                description: 'Published in Journal of Economic Analytics',
                icon: '📊'
            },
            {
                year: 2023,
                type: 'awards',
                title: 'Best Paper Award',
                description: 'International Conference on AI Economics',
                icon: '🏆'
            }
        ];
    }

    filterTimeline(filter) {
        // Update active filter
        document.querySelectorAll('.timeline-filter').forEach(btn => {
            btn.classList.remove('active');
        });
        
        document.querySelector(`[data-filter="${filter}"]`).classList.add('active');
        
        // Filter timeline items (3D visualization would be implemented here)
        console.log(`Filtering timeline by: ${filter}`);
    }

    setupSmartContactForm() {
        // Setup suggestion buttons
        document.querySelectorAll('.suggestion-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const textarea = document.getElementById('contact-message');
                const suggestion = btn.textContent;
                textarea.value += (textarea.value ? ' ' : '') + `I'm interested in ${suggestion}.`;
            });
        });
    }

    handleSmartContactForm() {
        const formData = {
            name: document.getElementById('contact-name').value,
            email: document.getElementById('contact-email').value,
            subject: document.getElementById('contact-subject').value,
            message: document.getElementById('contact-message').value,
            priority: document.querySelector('input[name="priority"]:checked').value
        };
        
        // Simulate form submission
        alert('Thank you for your message! I will get back to you soon.');
        
        // Reset form
        document.getElementById('smart-contact-form').reset();
    }

    analyzeContactMessage() {
        const message = document.getElementById('contact-message').value;
        const analysisDiv = document.getElementById('message-analysis');
        
        if (!message.trim()) {
            alert('Please enter a message to analyze.');
            return;
        }
        
        // Simple analysis
        const sentiment = this.analyzeSentiment(message);
        const wordCount = message.split(/\s+/).length;
        const hasQuestions = message.includes('?');
        
        const analysisResults = document.querySelector('.analysis-results');
        analysisResults.innerHTML = `
            <div class="analysis-item">
                <strong>Sentiment:</strong> ${sentiment.positive > 0.6 ? 'Positive' : sentiment.negative > 0.6 ? 'Negative' : 'Neutral'}
            </div>
            <div class="analysis-item">
                <strong>Word Count:</strong> ${wordCount} words
            </div>
            <div class="analysis-item">
                <strong>Contains Questions:</strong> ${hasQuestions ? 'Yes' : 'No'}
            </div>
            <div class="analysis-item">
                <strong>Estimated Response Time:</strong> ${this.estimateResponseTime(message)}
            </div>
        `;
        
        analysisDiv.classList.add('active');
    }

    estimateResponseTime(message) {
        const urgentWords = ['urgent', 'asap', 'immediately', 'emergency'];
        const isUrgent = urgentWords.some(word => message.toLowerCase().includes(word));
        
        if (isUrgent) return '2-4 hours';
        if (message.length > 500) return '1-2 days';
        return '12-24 hours';
    }

    handleScroll() {
        const navbar = document.getElementById('navbar');
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        // Animate elements on scroll
        this.animateOnScroll();
    }

    animateOnScroll() {
        const elements = document.querySelectorAll('.fade-in');
        
        elements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementVisible = 150;
            
            if (elementTop < window.innerHeight - elementVisible) {
                element.classList.add('visible');
            }
        });
    }

    handleResize() {
        // Handle responsive behavior
        if (window.innerWidth < 768) {
            // Mobile adjustments
            const aiPanel = document.getElementById('ai-assistant-panel');
            if (aiPanel.classList.contains('active')) {
                aiPanel.style.width = 'calc(100vw - 32px)';
            }
        } else {
            // Desktop adjustments
            const aiPanel = document.getElementById('ai-assistant-panel');
            aiPanel.style.width = '380px';
        }
    }

    // Placeholder methods for advanced features
    initializeAIAssistant() {
        console.log('AI Assistant initialized');
    }

    setupNavigation() {
        console.log('Navigation setup complete');
    }

    setupAIAssistant() {
        console.log('AI Assistant setup complete');
    }

    setupResearchTools() {
        console.log('Research tools setup complete');
    }

    setupCollaboration() {
        console.log('Collaboration features setup complete');
    }

    initializeAnimations() {
        // Setup GSAP animations if available
        if (typeof gsap !== 'undefined') {
            // Hero animations
            gsap.from('.hero-title', { duration: 1, y: 50, opacity: 0, delay: 0.5 });
            gsap.from('.hero-subtitle', { duration: 1, y: 30, opacity: 0, delay: 0.7 });
            gsap.from('.hero-description', { duration: 1, y: 30, opacity: 0, delay: 0.9 });
            gsap.from('.hero-buttons', { duration: 1, y: 30, opacity: 0, delay: 1.1 });
            
            // Profile animations
            gsap.from('.profile-hologram', { duration: 2, scale: 0.8, opacity: 0, delay: 1.3 });
        }
    }

    initialize3DResearchLab() {
        console.log('3D Research Lab initialized');
        // Three.js implementation would go here
    }

    initializePublicationsSearch() {
        console.log('Publications search initialized');
        // Advanced search functionality
    }

    initializeAITools() {
        console.log('AI Tools initialized');
        // Setup AI tool interfaces
    }

    initializeCollaborationSpace() {
        console.log('Collaboration space initialized');
        // Setup real-time collaboration features
    }

    initialize3DTimeline() {
        console.log('3D Timeline initialized');
        // Three.js timeline implementation
    }

    delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.portfolioApp = new AdvancedPortfolio();
});

// Service Worker registration for PWA functionality
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then((registration) => {
                console.log('SW registered: ', registration);
            })
            .catch((registrationError) => {
                console.log('SW registration failed: ', registrationError);
            });
    });
}