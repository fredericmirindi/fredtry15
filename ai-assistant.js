// AI Assistant JavaScript
// Advanced conversational AI for research assistance

class AIAssistant {
    constructor() {
        this.conversationHistory = [];
        this.knowledgeBase = new Map();
        this.researchContext = null;
        this.isTyping = false;
        this.personalities = new Map();
        this.init();
    }

    init() {
        this.initializeKnowledgeBase();
        this.initializePersonalities();
        this.setupEventListeners();
        this.loadConversationHistory();
    }

    initializeKnowledgeBase() {
        this.knowledgeBase = new Map([
            // Research Areas
            ['economics', {
                description: 'My expertise spans macroeconomics, microeconomics, econometrics, and behavioral economics',
                keywords: ['gdp', 'inflation', 'monetary policy', 'fiscal policy', 'market analysis', 'economic indicators'],
                responses: [
                    'I specialize in applying AI and machine learning to economic analysis and forecasting.',
                    'My research focuses on using advanced computational methods to understand economic phenomena.',
                    'I work with large-scale economic datasets and develop predictive models for policy analysis.'
                ]
            }],
            ['ai', {
                description: 'Expertise in machine learning, deep learning, NLP, and AI applications in economics',
                keywords: ['machine learning', 'deep learning', 'neural networks', 'lstm', 'transformer', 'nlp', 'ai'],
                responses: [
                    'I develop sophisticated AI models including LSTM networks, Transformers, and GANs for economic applications.',
                    'My AI research focuses on time series forecasting, natural language processing of economic texts, and causal inference.',
                    'I use cutting-edge deep learning techniques to analyze complex economic patterns and relationships.'
                ]
            }],
            ['research', {
                description: 'Current research projects and methodologies',
                keywords: ['research', 'projects', 'methodology', 'experiments', 'data', 'analysis'],
                responses: [
                    'I currently have several active research projects including GDP forecasting, blockchain economics, and policy impact analysis.',
                    'My research methodology combines traditional econometric approaches with modern machine learning techniques.',
                    'I collaborate with researchers worldwide on projects spanning AI, economics, and interdisciplinary studies.'
                ]
            }],
            ['collaboration', {
                description: 'Research collaboration and partnership opportunities',
                keywords: ['collaborate', 'partnership', 'work together', 'team', 'project'],
                responses: [
                    'I\'m always interested in collaborative research opportunities, especially in AI applications to economics.',
                    'I work with academic institutions, research centers, and industry partners on innovative projects.',
                    'My collaboration platform offers real-time whiteboard, code sharing, and video conferencing capabilities.'
                ]
            }],
            ['publications', {
                description: 'Academic publications and research output',
                keywords: ['papers', 'publications', 'articles', 'journals', 'conferences'],
                responses: [
                    'I have published research in leading economics and AI journals, with a focus on practical applications.',
                    'My recent publications cover topics like blockchain economics, NLP in central banking, and ML forecasting.',
                    'You can find my complete publication list with citation metrics in the Publications section.'
                ]
            }],
            ['blockchain', {
                description: 'Blockchain technology and cryptocurrency economics',
                keywords: ['blockchain', 'cryptocurrency', 'bitcoin', 'ethereum', 'defi', 'smart contracts'],
                responses: [
                    'I research the economic implications of blockchain technology and decentralized finance protocols.',
                    'My blockchain work includes network analysis, tokenomics, and the macroeconomic effects of cryptocurrencies.',
                    'I analyze DeFi protocols using graph neural networks and game theory.'
                ]
            }],
            ['forecasting', {
                description: 'Economic forecasting and prediction models',
                keywords: ['forecast', 'prediction', 'future', 'trends', 'modeling'],
                responses: [
                    'I develop advanced forecasting models using LSTM networks and ensemble methods for economic indicators.',
                    'My forecasting approach combines traditional econometric models with modern deep learning techniques.',
                    'I can demonstrate live forecasting tools for GDP, inflation, and other key economic variables.'
                ]
            }],
            ['policy', {
                description: 'Economic policy analysis and impact assessment',
                keywords: ['policy', 'government', 'regulation', 'impact', 'assessment'],
                responses: [
                    'I analyze economic policies using causal inference methods and machine learning.',
                    'My policy research includes fiscal policy, monetary policy, and regulatory impact assessment.',
                    'I develop simulation models to predict the economic effects of policy interventions.'
                ]
            }],
            ['data', {
                description: 'Economic datasets and data analysis techniques',
                keywords: ['data', 'dataset', 'analysis', 'statistics', 'database'],
                responses: [
                    'I work with comprehensive economic datasets including GDP, inflation, market data, and policy documents.',
                    'My data analysis combines traditional statistical methods with modern machine learning approaches.',
                    'I have access to high-quality, preprocessed datasets spanning multiple countries and decades.'
                ]
            }],
            ['tools', {
                description: 'AI tools and interactive demonstrations',
                keywords: ['tools', 'demo', 'interactive', 'try', 'test', 'experiment'],
                responses: [
                    'I offer several interactive AI tools including economic forecasting, sentiment analysis, and policy simulation.',
                    'You can try my AI tools in the AI Tools section - they\'re all live and demonstrate real capabilities.',
                    'Each tool includes detailed explanations, parameter controls, and downloadable results.'
                ]
            }]
        ]);
    }

    initializePersonalities() {
        this.personalities = new Map([
            ['professional', {
                tone: 'formal',
                style: 'academic',
                greetings: [
                    'Good day! I\'m your AI research assistant.',
                    'Hello! How can I assist with your research inquiries today?',
                    'Greetings! I\'m here to help with AI and economics research.'
                ],
                transitions: [
                    'Let me elaborate on that...',
                    'From a research perspective...',
                    'Based on my analysis...'
                ]
            }],
            ['friendly', {
                tone: 'casual',
                style: 'conversational',
                greetings: [
                    'Hi there! Ready to explore some fascinating research?',
                    'Hello! I\'m excited to discuss AI and economics with you.',
                    'Hey! What interesting research topic can I help you with?'
                ],
                transitions: [
                    'That\'s a great question!',
                    'I love talking about this topic...',
                    'Here\'s something interesting...'
                ]
            }],
            ['expert', {
                tone: 'technical',
                style: 'detailed',
                greetings: [
                    'Welcome to my research laboratory. How may I provide technical assistance?',
                    'I\'m your specialized AI assistant for advanced economic and computational research.',
                    'Access granted to research AI. Please specify your technical inquiry.'
                ],
                transitions: [
                    'From a methodological standpoint...',
                    'The technical implementation involves...',
                    'Advanced analysis reveals...'
                ]
            }
        ]);
        
        this.currentPersonality = 'friendly';
    }

    setupEventListeners() {
        // Input handling
        const aiInput = document.getElementById('ai-input');
        if (aiInput) {
            aiInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    this.handleUserInput();
                }
            });

            aiInput.addEventListener('input', () => {
                this.handleTypingIndicator();
            });
        }

        // Send button
        const sendBtn = document.getElementById('ai-send-btn');
        if (sendBtn) {
            sendBtn.addEventListener('click', () => {
                this.handleUserInput();
            });
        }

        // Conversation area click handler for interactive elements
        const conversation = document.getElementById('ai-conversation');
        if (conversation) {
            conversation.addEventListener('click', (e) => {
                this.handleConversationClick(e);
            });
        }
    }

    handleUserInput() {
        const input = document.getElementById('ai-input');
        const message = input.value.trim();
        
        if (!message) return;

        // Add user message
        this.addMessage('user', message);
        
        // Clear input
        input.value = '';
        
        // Process and respond
        this.processUserMessage(message);
    }

    addMessage(sender, content, type = 'text') {
        const conversation = document.getElementById('ai-conversation');
        if (!conversation) return;

        const messageDiv = document.createElement('div');
        messageDiv.className = `ai-message ${sender === 'user' ? 'user-message' : 'ai-message'}`;
        
        const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        
        if (type === 'text') {
            messageDiv.innerHTML = `
                <div class="message-avatar">${sender === 'user' ? '👤' : '🤖'}</div>
                <div class="message-content">
                    <div class="message-text">${content}</div>
                    <div class="message-timestamp">${timestamp}</div>
                </div>
            `;
        } else if (type === 'interactive') {
            messageDiv.innerHTML = `
                <div class="message-avatar">🤖</div>
                <div class="message-content">
                    <div class="message-text">${content}</div>
                    <div class="message-timestamp">${timestamp}</div>
                </div>
            `;
        }
        
        conversation.appendChild(messageDiv);
        conversation.scrollTop = conversation.scrollHeight;
        
        // Add to conversation history
        this.conversationHistory.push({
            sender,
            content,
            timestamp: new Date(),
            type
        });
        
        // Save to localStorage
        this.saveConversationHistory();
    }

    async processUserMessage(message) {
        // Show typing indicator
        this.showTypingIndicator();
        
        // Analyze message intent and generate response
        const response = await this.generateResponse(message);
        
        // Simulate thinking time
        await this.delay(1000 + Math.random() * 2000);
        
        // Hide typing indicator
        this.hideTypingIndicator();
        
        // Add AI response
        this.addMessage('ai', response.content, response.type);
        
        // Handle follow-up actions
        if (response.followUp) {
            this.handleFollowUpActions(response.followUp);
        }
    }

    async generateResponse(message) {
        const intent = this.analyzeIntent(message);
        const context = this.getConversationContext();
        
        // Generate appropriate response based on intent
        switch (intent.category) {
            case 'greeting':
                return this.generateGreetingResponse();
            
            case 'research_inquiry':
                return this.generateResearchResponse(intent, message);
            
            case 'tool_request':
                return this.generateToolResponse(intent, message);
            
            case 'collaboration':
                return this.generateCollaborationResponse(intent, message);
            
            case 'technical':
                return this.generateTechnicalResponse(intent, message);
            
            case 'personal':
                return this.generatePersonalResponse(intent, message);
            
            default:
                return this.generateDefaultResponse(message);
        }
    }

    analyzeIntent(message) {
        const lowercaseMessage = message.toLowerCase();
        
        // Greeting patterns
        if (/^(hi|hello|hey|good morning|good afternoon|good evening)/.test(lowercaseMessage)) {
            return { category: 'greeting', confidence: 0.9 };
        }
        
        // Research inquiry patterns
        if (this.containsKeywords(lowercaseMessage, ['research', 'study', 'analysis', 'model', 'data'])) {
            return { category: 'research_inquiry', confidence: 0.8 };
        }
        
        // Tool request patterns
        if (this.containsKeywords(lowercaseMessage, ['show', 'demo', 'try', 'test', 'tool', 'forecast'])) {
            return { category: 'tool_request', confidence: 0.8 };
        }
        
        // Collaboration patterns
        if (this.containsKeywords(lowercaseMessage, ['collaborate', 'work together', 'partnership', 'team'])) {
            return { category: 'collaboration', confidence: 0.8 };
        }
        
        // Technical patterns
        if (this.containsKeywords(lowercaseMessage, ['how', 'implementation', 'algorithm', 'technical', 'code'])) {
            return { category: 'technical', confidence: 0.7 };
        }
        
        // Personal patterns
        if (this.containsKeywords(lowercaseMessage, ['about you', 'your background', 'experience', 'education'])) {
            return { category: 'personal', confidence: 0.8 };
        }
        
        return { category: 'general', confidence: 0.5 };
    }

    containsKeywords(text, keywords) {
        return keywords.some(keyword => text.includes(keyword));
    }

    generateGreetingResponse() {
        const personality = this.personalities.get(this.currentPersonality);
        const greeting = personality.greetings[Math.floor(Math.random() * personality.greetings.length)];
        
        const suggestions = [
            '• Ask about my research in AI and economics',
            '• Explore my interactive AI tools',
            '• Learn about collaboration opportunities',
            '• Discuss specific economic topics'
        ];
        
        return {
            content: `${greeting}<br><br>I can help you with:<br>${suggestions.join('<br>')}`,
            type: 'text'
        };
    }

    generateResearchResponse(intent, message) {
        // Find the most relevant knowledge base entry
        let bestMatch = null;
        let highestScore = 0;
        
        for (const [topic, data] of this.knowledgeBase) {
            const score = this.calculateRelevanceScore(message, data.keywords);
            if (score > highestScore) {
                highestScore = score;
                bestMatch = { topic, data };
            }
        }
        
        if (bestMatch && highestScore > 0.3) {
            const response = bestMatch.data.responses[Math.floor(Math.random() * bestMatch.data.responses.length)];
            
            // Add interactive elements based on topic
            const interactiveElements = this.generateInteractiveElements(bestMatch.topic);
            
            return {
                content: `${response}<br><br>${bestMatch.data.description}${interactiveElements}`,
                type: 'text',
                followUp: bestMatch.topic
            };
        }
        
        return this.generateDefaultResponse(message);
    }

    generateToolResponse(intent, message) {
        const toolSuggestions = [
            {
                name: 'Economic Forecasting AI',
                description: 'Generate GDP, inflation, and employment forecasts',
                action: 'navigate_to_tools'
            },
            {
                name: 'Sentiment Analysis',
                description: 'Analyze economic text and market sentiment',
                action: 'navigate_to_tools'
            },
            {
                name: 'Policy Simulator',
                description: 'Simulate economic policy impacts',
                action: 'navigate_to_tools'
            }
        ];
        
        const toolsList = toolSuggestions.map(tool => 
            `<div class="tool-suggestion" data-action="${tool.action}">
                <strong>${tool.name}</strong><br>
                ${tool.description}
            </div>`
        ).join('');
        
        return {
            content: `I have several interactive AI tools available for demonstration:<br><br>${toolsList}`,
            type: 'interactive',
            followUp: 'tools'
        };
    }

    generateCollaborationResponse(intent, message) {
        const collaborationInfo = `
            I'm actively seeking research collaborations! Here are some ways we can work together:<br><br>
            
            <strong>🤝 Current Collaboration Opportunities:</strong><br>
            • AI applications in economic forecasting<br>
            • Blockchain economics and DeFi analysis<br>
            • Natural language processing for policy analysis<br>
            • Machine learning for causal inference<br><br>
            
            <strong>🛠️ Collaboration Tools Available:</strong><br>
            • Real-time whiteboard for brainstorming<br>
            • Shared code editor with version control<br>
            • Video conferencing and screen sharing<br>
            • Project management and tracking<br><br>
            
            <div class="collaboration-actions">
                <button class="action-btn" data-action="schedule_meeting">Schedule a Meeting</button>
                <button class="action-btn" data-action="view_projects">View Active Projects</button>
                <button class="action-btn" data-action="collaboration_hub">Visit Collaboration Hub</button>
            </div>
        `;
        
        return {
            content: collaborationInfo,
            type: 'interactive',
            followUp: 'collaboration'
        };
    }

    generateTechnicalResponse(intent, message) {
        const technicalTopics = [
            {
                topic: 'LSTM Implementation',
                description: 'Deep dive into LSTM architecture for economic forecasting',
                code: true
            },
            {
                topic: 'Transformer Models',
                description: 'Attention mechanisms for economic text analysis',
                code: true
            },
            {
                topic: 'Graph Neural Networks',
                description: 'Network analysis for blockchain economics',
                code: true
            }
        ];
        
        const topicsList = technicalTopics.map(topic => 
            `<div class="technical-topic" data-topic="${topic.topic}">
                <strong>${topic.topic}</strong><br>
                ${topic.description}
                ${topic.code ? '<span class="code-badge">📝 Code Available</span>' : ''}
            </div>`
        ).join('');
        
        return {
            content: `I can provide detailed technical explanations and implementations:<br><br>${topicsList}<br>
Click on any topic for detailed technical documentation and code examples.`,
            type: 'interactive',
            followUp: 'technical'
        };
    }

    generatePersonalResponse(intent, message) {
        const personalInfo = `
            <strong>👨‍🎓 About Me:</strong><br>
            I'm Frédéric Mirindi, a PhD candidate in Economics & Econometrics at the University of Manitoba, 
            specializing in AI applications for economic analysis.<br><br>
            
            <strong>🎯 Research Focus:</strong><br>
            • Machine learning for economic forecasting<br>
            • NLP applications in economics<br>
            • Blockchain economics and DeFi<br>
            • Policy impact analysis using AI<br><br>
            
            <strong>🏢 Professional Experience:</strong><br>
            • Founder & CEO of ThinkBit Edge Corp.<br>
            • Research collaborations with leading universities<br>
            • Publications in top-tier journals<br><br>
            
            <strong>🎓 Educational Background:</strong><br>
            • PhD in Economics & Econometrics (In Progress)<br>
            • Advanced training in machine learning and AI<br>
            • Interdisciplinary research experience<br><br>
            
            <div class="personal-actions">
                <button class="action-btn" data-action="view_cv">View Full CV</button>
                <button class="action-btn" data-action="publications">See Publications</button>
                <button class="action-btn" data-action="timeline">Academic Timeline</button>
            </div>
        `;
        
        return {
            content: personalInfo,
            type: 'interactive',
            followUp: 'personal'
        };
    }

    generateDefaultResponse(message) {
        const defaultResponses = [
            "That's an interesting question! Could you provide more details about what you'd like to know?",
            "I'd be happy to help! Can you clarify what specific aspect you're interested in?",
            "Let me help you with that. Could you elaborate on your question?",
            "I'm here to assist with research, AI tools, and collaboration. What would you like to explore?"
        ];
        
        const response = defaultResponses[Math.floor(Math.random() * defaultResponses.length)];
        
        const suggestions = `
            <br><br><strong>Popular topics I can help with:</strong><br>
            • Economic forecasting and modeling<br>
            • AI and machine learning applications<br>
            • Research collaboration opportunities<br>
            • Interactive AI tool demonstrations<br>
            • Academic publications and citations
        `;
        
        return {
            content: response + suggestions,
            type: 'text'
        };
    }

    generateInteractiveElements(topic) {
        const elements = {
            'ai': '<br><br><button class="action-btn" data-action="demo_ai_tools">🔬 Try AI Tools</button>',
            'research': '<br><br><button class="action-btn" data-action="view_research_lab">🧪 Visit Research Lab</button>',
            'forecasting': '<br><br><button class="action-btn" data-action="run_forecast">📈 Run Forecast Demo</button>',
            'blockchain': '<br><br><button class="action-btn" data-action="blockchain_analysis">⛓️ Blockchain Analysis</button>',
            'collaboration': '<br><br><button class="action-btn" data-action="collaboration_hub">🤝 Collaboration Hub</button>'
        };
        
        return elements[topic] || '';
    }

    calculateRelevanceScore(message, keywords) {
        const messageLower = message.toLowerCase();
        let score = 0;
        
        keywords.forEach(keyword => {
            if (messageLower.includes(keyword.toLowerCase())) {
                score += 1;
            }
        });
        
        return score / keywords.length;
    }

    showTypingIndicator() {
        if (this.isTyping) return;
        
        this.isTyping = true;
        const conversation = document.getElementById('ai-conversation');
        if (!conversation) return;

        const typingDiv = document.createElement('div');
        typingDiv.className = 'ai-message typing-indicator';
        typingDiv.id = 'typing-indicator';
        
        typingDiv.innerHTML = `
            <div class="message-avatar">🤖</div>
            <div class="message-content">
                <div class="typing-animation">
                    <span class="typing-dot"></span>
                    <span class="typing-dot"></span>
                    <span class="typing-dot"></span>
                </div>
            </div>
        `;
        
        conversation.appendChild(typingDiv);
        conversation.scrollTop = conversation.scrollHeight;
    }

    hideTypingIndicator() {
        const typingIndicator = document.getElementById('typing-indicator');
        if (typingIndicator) {
            typingIndicator.remove();
        }
        this.isTyping = false;
    }

    handleConversationClick(e) {
        const target = e.target;
        
        if (target.classList.contains('action-btn')) {
            const action = target.getAttribute('data-action');
            this.handleActionClick(action);
        }
        
        if (target.classList.contains('tool-suggestion')) {
            const action = target.getAttribute('data-action');
            this.handleActionClick(action);
        }
    }

    handleActionClick(action) {
        switch (action) {
            case 'navigate_to_tools':
            case 'demo_ai_tools':
                this.addMessage('ai', '🚀 Redirecting you to the AI Tools section...');
                setTimeout(() => {
                    if (window.portfolioApp) {
                        window.portfolioApp.navigateToPage('ai-tools');
                    }
                }, 1000);
                break;
                
            case 'view_research_lab':
                this.addMessage('ai', '🔬 Opening the Research Laboratory...');
                setTimeout(() => {
                    if (window.portfolioApp) {
                        window.portfolioApp.navigateToPage('research-lab');
                    }
                }, 1000);
                break;
                
            case 'collaboration_hub':
                this.addMessage('ai', '🤝 Taking you to the Collaboration Hub...');
                setTimeout(() => {
                    if (window.portfolioApp) {
                        window.portfolioApp.navigateToPage('collaboration');
                    }
                }, 1000);
                break;
                
            case 'schedule_meeting':
                this.addMessage('ai', '📅 Opening meeting scheduler...');
                setTimeout(() => {
                    if (window.portfolioApp) {
                        window.portfolioApp.navigateToPage('contact');
                    }
                }, 1000);
                break;
                
            case 'run_forecast':
                this.handleForecastDemo();
                break;
                
            case 'view_cv':
            case 'timeline':
                this.addMessage('ai', '📊 Loading academic timeline...');
                setTimeout(() => {
                    if (window.portfolioApp) {
                        window.portfolioApp.navigateToPage('timeline');
                    }
                }, 1000);
                break;
                
            case 'publications':
                this.addMessage('ai', '📚 Opening publications section...');
                setTimeout(() => {
                    if (window.portfolioApp) {
                        window.portfolioApp.navigateToPage('publications');
                    }
                }, 1000);
                break;
                
            default:
                this.addMessage('ai', `🤖 Processing ${action}... This feature is coming soon!`);
        }
    }

    handleForecastDemo() {
        this.addMessage('ai', '📈 Running quick forecast demonstration...');
        
        setTimeout(() => {
            const forecastResult = {
                indicator: 'GDP Growth',
                prediction: '+2.4%',
                confidence: '94.2%',
                timeframe: 'Next Quarter'
            };
            
            const resultHTML = `
                <div class="forecast-demo-result">
                    <strong>🎯 Forecast Result:</strong><br>
                    <div class="result-grid">
                        <div class="result-item">
                            <span class="label">Indicator:</span>
                            <span class="value">${forecastResult.indicator}</span>
                        </div>
                        <div class="result-item">
                            <span class="label">Prediction:</span>
                            <span class="value positive">${forecastResult.prediction}</span>
                        </div>
                        <div class="result-item">
                            <span class="label">Confidence:</span>
                            <span class="value">${forecastResult.confidence}</span>
                        </div>
                        <div class="result-item">
                            <span class="label">Timeframe:</span>
                            <span class="value">${forecastResult.timeframe}</span>
                        </div>
                    </div>
                    <br>
                    <button class="action-btn" data-action="navigate_to_tools">🚀 Try Full Forecasting Tool</button>
                </div>
            `;
            
            this.addMessage('ai', resultHTML, 'interactive');
        }, 2000);
    }

    handleTypingIndicator() {
        // Show smart suggestions while user is typing
        const input = document.getElementById('ai-input');
        if (!input) return;
        
        const value = input.value.toLowerCase();
        
        if (value.length > 3) {
            this.showSmartSuggestions(value);
        } else {
            this.hideSmartSuggestions();
        }
    }

    showSmartSuggestions(inputValue) {
        // This could show contextual suggestions based on input
        // Implementation would depend on UI design
    }

    hideSmartSuggestions() {
        // Hide suggestions panel
    }

    getConversationContext() {
        // Analyze recent conversation for context
        const recentMessages = this.conversationHistory.slice(-5);
        const topics = [];
        
        recentMessages.forEach(msg => {
            for (const [topic, data] of this.knowledgeBase) {
                if (this.calculateRelevanceScore(msg.content, data.keywords) > 0.3) {
                    topics.push(topic);
                }
            }
        });
        
        return {
            recentTopics: [...new Set(topics)],
            messageCount: this.conversationHistory.length,
            lastMessageTime: this.conversationHistory[this.conversationHistory.length - 1]?.timestamp
        };
    }

    saveConversationHistory() {
        try {
            localStorage.setItem('ai_conversation_history', JSON.stringify(this.conversationHistory));
        } catch (error) {
            console.log('Could not save conversation history:', error);
        }
    }

    loadConversationHistory() {
        try {
            const saved = localStorage.getItem('ai_conversation_history');
            if (saved) {
                this.conversationHistory = JSON.parse(saved);
                // Optionally restore recent conversation to UI
            }
        } catch (error) {
            console.log('Could not load conversation history:', error);
        }
    }

    clearConversationHistory() {
        this.conversationHistory = [];
        localStorage.removeItem('ai_conversation_history');
        
        // Clear UI
        const conversation = document.getElementById('ai-conversation');
        if (conversation) {
            conversation.innerHTML = '';
            // Re-add welcome message
            this.addWelcomeMessage();
        }
    }

    addWelcomeMessage() {
        const welcomeMessage = `
            Hello! I'm your AI research assistant. I can help you:
            <ul>
                <li>🔍 Find relevant research papers and insights</li>
                <li>📊 Analyze economic data and trends</li>
                <li>🤖 Demonstrate AI tools and models</li>
                <li>🤝 Facilitate research collaborations</li>
                <li>📈 Run economic forecasts and simulations</li>
            </ul>
            What would you like to explore today?
        `;
        
        this.addMessage('ai', welcomeMessage, 'text');
    }

    switchPersonality(personality) {
        if (this.personalities.has(personality)) {
            this.currentPersonality = personality;
            this.addMessage('ai', `🎭 Personality switched to ${personality} mode.`);
        }
    }

    getAssistantStats() {
        return {
            totalConversations: this.conversationHistory.length,
            knowledgeBaseSize: this.knowledgeBase.size,
            availablePersonalities: this.personalities.size,
            currentPersonality: this.currentPersonality,
            isActive: true
        };
    }

    delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}

// Export for global access
window.AIAssistant = AIAssistant;

// Initialize AI Assistant when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    window.aiAssistant = new AIAssistant();
    console.log('AI Assistant initialized successfully');
});

// Add CSS for AI Assistant styling
const aiAssistantCSS = `
.typing-indicator {
    opacity: 0.7;
}

.typing-animation {
    display: flex;
    gap: 4px;
    align-items: center;
}

.typing-dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: var(--color-primary);
    animation: typing-bounce 1.4s infinite ease-in-out;
}

.typing-dot:nth-child(1) { animation-delay: -0.32s; }
.typing-dot:nth-child(2) { animation-delay: -0.16s; }
.typing-dot:nth-child(3) { animation-delay: 0s; }

@keyframes typing-bounce {
    0%, 80%, 100% {
        transform: scale(0.8);
        opacity: 0.5;
    }
    40% {
        transform: scale(1);
        opacity: 1;
    }
}

.user-message {
    flex-direction: row-reverse;
}

.user-message .message-content {
    background: var(--color-primary);
    color: white;
    border-radius: var(--radius-lg) var(--radius-lg) var(--radius-sm) var(--radius-lg);
}

.ai-message .message-content {
    background: var(--color-secondary);
    border-radius: var(--radius-lg) var(--radius-lg) var(--radius-lg) var(--radius-sm);
}

.message-timestamp {
    font-size: var(--font-size-xs);
    color: var(--color-text-secondary);
    margin-top: var(--space-1);
    opacity: 0.7;
}

.action-btn {
    display: inline-block;
    padding: var(--space-2) var(--space-3);
    background: var(--color-primary);
    color: white;
    border: none;
    border-radius: var(--radius-base);
    cursor: pointer;
    font-size: var(--font-size-sm);
    margin: var(--space-1) var(--space-1) 0 0;
    transition: all var(--duration-fast) var(--ease-standard);
}

.action-btn:hover {
    background: var(--color-primary-hover);
    transform: translateY(-1px);
}

.tool-suggestion, .technical-topic {
    padding: var(--space-3);
    margin: var(--space-2) 0;
    background: var(--color-background);
    border: 1px solid var(--color-border);
    border-radius: var(--radius-base);
    cursor: pointer;
    transition: all var(--duration-fast) var(--ease-standard);
}

.tool-suggestion:hover, .technical-topic:hover {
    border-color: var(--color-primary);
    transform: translateY(-2px);
    box-shadow: var(--shadow-md);
}

.code-badge {
    display: inline-block;
    padding: var(--space-1) var(--space-2);
    background: var(--color-success);
    color: white;
    border-radius: var(--radius-sm);
    font-size: var(--font-size-xs);
    margin-left: var(--space-2);
}

.forecast-demo-result {
    background: var(--color-background);
    border: 1px solid var(--color-border);
    border-radius: var(--radius-lg);
    padding: var(--space-4);
    margin: var(--space-2) 0;
}

.result-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: var(--space-2);
    margin: var(--space-3) 0;
}

.result-item {
    display: flex;
    justify-content: space-between;
    padding: var(--space-1) 0;
}

.result-item .label {
    font-weight: 500;
    color: var(--color-text-secondary);
}

.result-item .value {
    font-weight: 600;
    color: var(--color-text);
}

.result-item .value.positive {
    color: var(--color-success);
}

.collaboration-actions, .personal-actions {
    margin-top: var(--space-4);
    display: flex;
    gap: var(--space-2);
    flex-wrap: wrap;
}

@media (max-width: 768px) {
    .result-grid {
        grid-template-columns: 1fr;
    }
    
    .collaboration-actions, .personal-actions {
        flex-direction: column;
    }
    
    .action-btn {
        width: 100%;
        text-align: center;
    }
}
`;

// Inject CSS
const style = document.createElement('style');
style.textContent = aiAssistantCSS;
document.head.appendChild(style);