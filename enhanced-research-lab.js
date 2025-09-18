/**
 * Enhanced Research Lab Section JavaScript
 * Handles interactive functionality for the professional academic portfolio
 * Author: Frédéric Mirindi
 */

class EnhancedResearchLab {
    constructor() {
        this.currentTab = 'projects';
        this.isInitialized = false;
        
        // Wait for DOM to be ready
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.init());
        } else {
            this.init();
        }
    }

    init() {
        if (this.isInitialized) return;
        
        try {
            this.setupTabNavigation();
            this.setupProgressAnimations();
            this.setupHoverEffects();
            this.setupButtonActions();
            this.setupTooltips();
            this.setupScrollAnimations();
            this.isInitialized = true;
            
            console.log('Enhanced Research Lab initialized successfully');
        } catch (error) {
            console.error('Error initializing Enhanced Research Lab:', error);
        }
    }

    /**
     * Setup tab navigation system
     */
    setupTabNavigation() {
        const tabButtons = document.querySelectorAll('#research-lab .tab-btn');
        const tabContents = document.querySelectorAll('#research-lab .tab-content');

        if (tabButtons.length === 0 || tabContents.length === 0) return;

        tabButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                const targetTab = button.getAttribute('data-tab');
                
                if (!targetTab) return;
                
                // Remove active class from all buttons and contents
                tabButtons.forEach(btn => btn.classList.remove('active'));
                tabContents.forEach(content => content.classList.remove('active'));
                
                // Add active class to clicked button and corresponding content
                button.classList.add('active');
                const targetContent = document.getElementById(`${targetTab}-tab`);
                
                if (targetContent) {
                    targetContent.classList.add('active');
                    
                    // Trigger specific initialization for the tab
                    this.initializeTab(targetTab);
                    
                    // Update current tab
                    this.currentTab = targetTab;
                    
                    // Smooth scroll to top of section
                    const researchLabSection = document.getElementById('research-lab');
                    if (researchLabSection) {
                        researchLabSection.scrollIntoView({ 
                            behavior: 'smooth',
                            block: 'start'
                        });
                    }
                }
            });
        });
    }

    /**
     * Initialize specific functionality for each tab
     */
    initializeTab(tabName) {
        switch (tabName) {
            case 'projects':
                this.initializeProjectsTab();
                break;
            case 'methodology':
                this.initializeMethodologyTab();
                break;
            case 'team':
                this.initializeTeamTab();
                break;
            case 'output':
                this.initializeOutputTab();
                break;
            case 'tools':
                this.initializeToolsTab();
                break;
        }
    }

    /**
     * Initialize Projects tab
     */
    initializeProjectsTab() {
        // Animate project cards
        const projectCards = document.querySelectorAll('#research-lab .project-card');
        projectCards.forEach((card, index) => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            
            setTimeout(() => {
                card.style.transition = 'all 0.6s ease';
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, index * 200);
        });

        // Animate progress bars
        this.animateProgressBars();
        
        // Setup timeline interactions
        this.setupTimelineInteractions();
    }

    /**
     * Initialize Methodology tab
     */
    initializeMethodologyTab() {
        const methodologyCards = document.querySelectorAll('#research-lab .methodology-card');
        methodologyCards.forEach((card, index) => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            
            setTimeout(() => {
                card.style.transition = 'all 0.5s ease';
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, index * 150);
        });

        // Animate framework steps
        const frameworkSteps = document.querySelectorAll('#research-lab .framework-step');
        frameworkSteps.forEach((step, index) => {
            step.style.opacity = '0';
            step.style.transform = 'scale(0.9)';
            
            setTimeout(() => {
                step.style.transition = 'all 0.5s ease';
                step.style.opacity = '1';
                step.style.transform = 'scale(1)';
            }, index * 200);
        });
    }

    /**
     * Initialize Team tab
     */
    initializeTeamTab() {
        const teamMembers = document.querySelectorAll('#research-lab .committee-member');
        teamMembers.forEach((member, index) => {
            member.style.opacity = '0';
            member.style.transform = 'translateY(20px)';
            
            setTimeout(() => {
                member.style.transition = 'all 0.6s ease';
                member.style.opacity = '1';
                member.style.transform = 'translateY(0)';
            }, index * 250);
        });
    }

    /**
     * Initialize Output tab
     */
    initializeOutputTab() {
        const outputItems = document.querySelectorAll('#research-lab .output-item');
        outputItems.forEach((item, index) => {
            item.style.opacity = '0';
            item.style.transform = 'translateX(-20px)';
            
            setTimeout(() => {
                item.style.transition = 'all 0.5s ease';
                item.style.opacity = '1';
                item.style.transform = 'translateX(0)';
            }, index * 200);
        });
    }

    /**
     * Initialize Tools tab
     */
    initializeToolsTab() {
        const techTags = document.querySelectorAll('#research-lab .tech-tag');
        techTags.forEach(tag => {
            tag.addEventListener('click', () => {
                this.handleTechTagClick(tag);
            });
        });
    }

    /**
     * Setup progress bar animations
     */
    setupProgressAnimations() {
        // This will be called when the projects tab is initialized
        // No need for immediate setup here
    }

    /**
     * Animate progress bars when they come into view
     */
    animateProgressBars() {
        const progressBars = document.querySelectorAll('#research-lab .progress-fill');
        
        progressBars.forEach(bar => {
            const targetWidth = bar.style.width;
            if (!targetWidth) return;
            
            bar.style.width = '0%';
            
            // Use Intersection Observer for scroll-triggered animations
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        setTimeout(() => {
                            entry.target.style.width = targetWidth;
                        }, 500);
                        observer.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.5 });
            
            observer.observe(bar);
        });
    }

    /**
     * Setup hover effects
     */
    setupHoverEffects() {
        // Project cards hover effects
        const projectCards = document.querySelectorAll('#research-lab .project-card');
        projectCards.forEach(card => {
            card.addEventListener('mouseenter', () => {
                card.style.transform = 'translateY(-8px) scale(1.02)';
            });
            
            card.addEventListener('mouseleave', () => {
                card.style.transform = 'translateY(0) scale(1)';
            });
        });

        // Tech tags hover effects
        const techTags = document.querySelectorAll('#research-lab .tech-tag');
        techTags.forEach(tag => {
            tag.addEventListener('mouseenter', () => {
                tag.style.transform = 'translateY(-2px) scale(1.05)';
                tag.style.boxShadow = '0 4px 12px rgba(33, 128, 141, 0.3)';
            });
            
            tag.addEventListener('mouseleave', () => {
                tag.style.transform = 'translateY(0) scale(1)';
                tag.style.boxShadow = 'none';
            });
        });
    }

    /**
     * Setup button actions
     */
    setupButtonActions() {
        // Project action buttons
        const projectButtons = document.querySelectorAll('#research-lab .project-actions .btn');
        projectButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                const action = button.textContent.trim().toLowerCase();
                const projectCard = button.closest('.project-card');
                
                if (projectCard) {
                    const projectTitle = projectCard.querySelector('h3')?.textContent || 'Unknown Project';
                    this.handleProjectAction(action, projectTitle, button);
                }
            });
        });

        // Team member contact buttons
        const contactButtons = document.querySelectorAll('#research-lab .member-contact .btn');
        contactButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                const action = button.textContent.trim().toLowerCase();
                const memberCard = button.closest('.committee-member');
                
                if (memberCard) {
                    const memberName = memberCard.querySelector('h4')?.textContent || 'Unknown Member';
                    this.handleContactAction(action, memberName);
                }
            });
        });

        // Repository buttons
        const repoButtons = document.querySelectorAll('#research-lab .repo-card .btn');
        repoButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                const repoCard = button.closest('.repo-card');
                const repoName = repoCard?.querySelector('h4')?.textContent?.replace('🔗 ', '') || 'repository';
                
                // Open GitHub profile (replace with actual repo URLs when available)
                window.open('https://github.com/fredericmirindi', '_blank');
            });
        });
    }

    /**
     * Handle project action buttons
     */
    handleProjectAction(action, projectTitle, buttonElement) {
        // Add loading state
        const originalText = buttonElement.textContent;
        buttonElement.textContent = 'Loading...';
        buttonElement.disabled = true;
        
        setTimeout(() => {
            buttonElement.textContent = originalText;
            buttonElement.disabled = false;
            
            switch (action) {
                case 'view details':
                    this.showProjectModal(projectTitle);
                    break;
                case 'code repository':
                    window.open('https://github.com/fredericmirindi', '_blank');
                    break;
                case 'company website':
                    window.open('https://fredericmirindi.com', '_blank');
                    break;
                case 'working paper':
                    this.showComingSoon('Working Paper');
                    break;
                case 'methodology':
                    this.showComingSoon('Methodology Details');
                    break;
                default:
                    this.showComingSoon(action);
            }
        }, 1000);
    }

    /**
     * Handle contact actions
     */
    handleContactAction(action, memberName) {
        if (action.includes('contact')) {
            // Generate placeholder email
            const email = `${memberName.toLowerCase().replace(/\s+/g, '.').replace('dr.', '')}@umanitoba.ca`;
            window.open(`mailto:${email}?subject=Research Collaboration Inquiry`, '_blank');
        } else if (action.includes('profile')) {
            // Open Google Scholar search
            const searchQuery = encodeURIComponent(memberName.replace('Dr. ', '').replace('Prof. ', ''));
            window.open(`https://scholar.google.com/scholar?q=${searchQuery}`, '_blank');
        }
    }

    /**
     * Handle tech tag clicks
     */
    handleTechTagClick(tagElement) {
        const techName = tagElement.textContent.trim();
        
        // Add click effect
        tagElement.style.transform = 'scale(0.95)';
        setTimeout(() => {
            tagElement.style.transform = 'scale(1.05)';
        }, 100);
        
        // Show info about the technology (placeholder)
        this.showTechInfo(techName);
    }

    /**
     * Setup timeline interactions
     */
    setupTimelineInteractions() {
        const timelineItems = document.querySelectorAll('#research-lab .timeline-item');
        
        timelineItems.forEach(item => {
            item.style.cursor = 'pointer';
            
            item.addEventListener('click', () => {
                // Remove active class from all items
                timelineItems.forEach(i => i.classList.remove('timeline-selected'));
                
                // Add active class to clicked item
                item.classList.add('timeline-selected');
                
                // Get timeline details
                const title = item.querySelector('h4')?.textContent || 'Timeline Item';
                const description = item.querySelector('p')?.textContent || 'No description available';
                const date = item.querySelector('.timeline-date')?.textContent || 'Unknown date';
                
                this.showTimelineModal(title, description, date);
            });
        });
    }

    /**
     * Setup tooltips
     */
    setupTooltips() {
        const tooltipElements = document.querySelectorAll('#research-lab [data-tooltip]');
        
        tooltipElements.forEach(element => {
            element.addEventListener('mouseenter', (e) => {
                const tooltipText = element.getAttribute('data-tooltip');
                if (tooltipText) {
                    this.showTooltip(e.target, tooltipText);
                }
            });
            
            element.addEventListener('mouseleave', () => {
                this.hideTooltip();
            });
        });
    }

    /**
     * Setup scroll animations
     */
    setupScrollAnimations() {
        const animatedElements = document.querySelectorAll('#research-lab .overview-card, #research-lab .impact-card');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, {
            threshold: 0.3,
            rootMargin: '0px 0px -50px 0px'
        });
        
        animatedElements.forEach(element => {
            element.style.opacity = '0';
            element.style.transform = 'translateY(20px)';
            element.style.transition = 'all 0.6s ease';
            observer.observe(element);
        });
    }

    /**
     * Show project modal
     */
    showProjectModal(projectTitle) {
        const modal = this.createModal(
            `Project: ${projectTitle}`,
            this.getProjectModalContent(projectTitle)
        );
        
        document.body.appendChild(modal);
        
        // Show modal with animation
        requestAnimationFrame(() => {
            modal.style.opacity = '1';
            modal.querySelector('.modal-content').style.transform = 'scale(1)';
        });
    }

    /**
     * Show timeline modal
     */
    showTimelineModal(title, description, date) {
        const content = `
            <h3>${title}</h3>
            <p class="timeline-modal-date"><strong>Date:</strong> ${date}</p>
            <p><strong>Description:</strong> ${description}</p>
            <div class="timeline-extended-info">
                <h4>Additional Details</h4>
                <p>This milestone represents an important step in my PhD journey. Each phase builds upon previous accomplishments and contributes to the overall research objectives.</p>
            </div>
        `;
        
        const modal = this.createModal('Timeline Details', content);
        document.body.appendChild(modal);
        
        requestAnimationFrame(() => {
            modal.style.opacity = '1';
            modal.querySelector('.modal-content').style.transform = 'scale(1)';
        });
    }

    /**
     * Get project modal content
     */
    getProjectModalContent(projectTitle) {
        // This would be populated with real project data
        return `
            <div class="project-modal-content">
                <h3>${projectTitle}</h3>
                <div class="project-overview">
                    <h4>Overview</h4>
                    <p>This project represents a significant contribution to the field of AI-Economics research. It combines advanced machine learning techniques with economic theory to address real-world forecasting challenges.</p>
                </div>
                <div class="project-objectives">
                    <h4>Research Objectives</h4>
                    <ul>
                        <li>Develop novel ML models for economic prediction</li>
                        <li>Integrate alternative data sources</li>
                        <li>Validate models against real-world data</li>
                        <li>Publish findings in top-tier journals</li>
                    </ul>
                </div>
                <div class="project-methodology">
                    <h4>Methodology</h4>
                    <p>The research employs a mixed-methods approach combining quantitative econometric techniques with advanced machine learning algorithms including LSTM networks, Transformers, and ensemble methods.</p>
                </div>
                <div class="project-status">
                    <h4>Current Status</h4>
                    <p>The project is currently in the data collection and analysis phase, with preliminary results showing promising improvements over traditional forecasting methods.</p>
                </div>
            </div>
        `;
    }

    /**
     * Show coming soon modal
     */
    showComingSoon(feature) {
        const content = `
            <div class="coming-soon-content">
                <h3>🚧 Coming Soon</h3>
                <p><strong>${feature}</strong> will be available soon.</p>
                <p>This feature is currently under development as part of my ongoing PhD research. Please check back later or contact me directly for more information.</p>
                <div class="contact-info">
                    <p><strong>Email:</strong> frederic.mirindi@umanitoba.ca</p>
                </div>
            </div>
        `;
        
        const modal = this.createModal('Coming Soon', content);
        document.body.appendChild(modal);
        
        requestAnimationFrame(() => {
            modal.style.opacity = '1';
            modal.querySelector('.modal-content').style.transform = 'scale(1)';
        });
    }

    /**
     * Show tech info modal
     */
    showTechInfo(techName) {
        const techInfo = {
            'Python': 'Primary programming language for data analysis, machine learning model development, and statistical computing.',
            'R': 'Statistical computing environment used for econometric analysis and data visualization.',
            'TensorFlow': 'Deep learning framework used for building and training neural network models.',
            'PyTorch': 'Machine learning library used for research and prototyping of deep learning models.',
            'SQL': 'Database query language for data extraction and management.',
            'JavaScript': 'Used for web development and interactive data visualizations.',
        };
        
        const description = techInfo[techName] || `${techName} is an important tool in my research toolkit for AI and economics applications.`;
        
        const content = `
            <div class="tech-info-content">
                <h3>💻 ${techName}</h3>
                <p>${description}</p>
                <div class="tech-usage">
                    <h4>Usage in Research</h4>
                    <p>This technology plays a crucial role in my PhD research, enabling advanced data analysis and model development for economic forecasting applications.</p>
                </div>
            </div>
        `;
        
        const modal = this.createModal('Technology Info', content);
        document.body.appendChild(modal);
        
        requestAnimationFrame(() => {
            modal.style.opacity = '1';
            modal.querySelector('.modal-content').style.transform = 'scale(1)';
        });
    }

    /**
     * Show tooltip
     */
    showTooltip(element, text) {
        const tooltip = document.createElement('div');
        tooltip.className = 'research-tooltip';
        tooltip.textContent = text;
        tooltip.style.cssText = `
            position: absolute;
            background: #1e293b;
            color: white;
            padding: 0.5rem 0.8rem;
            border-radius: 6px;
            font-size: 0.8rem;
            z-index: 1001;
            pointer-events: none;
            opacity: 0;
            transition: opacity 0.3s ease;
            max-width: 200px;
            word-wrap: break-word;
        `;
        
        document.body.appendChild(tooltip);
        
        const rect = element.getBoundingClientRect();
        tooltip.style.left = rect.left + (rect.width / 2) - (tooltip.offsetWidth / 2) + 'px';
        tooltip.style.top = rect.top - tooltip.offsetHeight - 8 + window.scrollY + 'px';
        
        requestAnimationFrame(() => {
            tooltip.style.opacity = '1';
        });
    }

    /**
     * Hide tooltip
     */
    hideTooltip() {
        const tooltip = document.querySelector('.research-tooltip');
        if (tooltip) {
            tooltip.style.opacity = '0';
            setTimeout(() => {
                if (tooltip.parentNode) {
                    tooltip.parentNode.removeChild(tooltip);
                }
            }, 300);
        }
    }

    /**
     * Create modal
     */
    createModal(title, content) {
        const modal = document.createElement('div');
        modal.className = 'research-modal';
        modal.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0,0,0,0.5);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 1000;
            opacity: 0;
            transition: opacity 0.3s ease;
            padding: 1rem;
            box-sizing: border-box;
        `;
        
        const modalContent = document.createElement('div');
        modalContent.className = 'modal-content';
        modalContent.style.cssText = `
            background: white;
            padding: 2rem;
            border-radius: 16px;
            max-width: 90%;
            max-height: 90%;
            overflow-y: auto;
            transform: scale(0.9);
            transition: transform 0.3s ease;
            box-shadow: 0 20px 60px rgba(0,0,0,0.3);
            position: relative;
            width: 100%;
            max-width: 600px;
        `;
        
        const closeButton = document.createElement('button');
        closeButton.innerHTML = '&times;';
        closeButton.style.cssText = `
            position: absolute;
            top: 1rem;
            right: 1rem;
            background: none;
            border: none;
            font-size: 2rem;
            cursor: pointer;
            color: #64748b;
            width: 40px;
            height: 40px;
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 50%;
            transition: background-color 0.2s ease;
        `;
        
        closeButton.addEventListener('mouseenter', () => {
            closeButton.style.backgroundColor = '#f1f5f9';
        });
        
        closeButton.addEventListener('mouseleave', () => {
            closeButton.style.backgroundColor = 'transparent';
        });
        
        closeButton.addEventListener('click', () => {
            modal.style.opacity = '0';
            setTimeout(() => {
                if (document.body.contains(modal)) {
                    document.body.removeChild(modal);
                }
            }, 300);
        });
        
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeButton.click();
            }
        });
        
        // Add keyboard support
        const handleKeydown = (e) => {
            if (e.key === 'Escape') {
                closeButton.click();
                document.removeEventListener('keydown', handleKeydown);
            }
        };
        document.addEventListener('keydown', handleKeydown);
        
        modalContent.innerHTML = content;
        modalContent.appendChild(closeButton);
        modal.appendChild(modalContent);
        
        return modal;
    }
}

// Global functions for inline onclick handlers
window.showProjectDetails = function(projectId) {
    if (window.enhancedResearchLab) {
        window.enhancedResearchLab.showProjectModal(projectId);
    }
};

window.openLink = function(url) {
    if (url) {
        window.open(url, '_blank');
    }
};

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    // Only initialize if we're on a page with the research lab section
    if (document.getElementById('research-lab')) {
        window.enhancedResearchLab = new EnhancedResearchLab();
        console.log('Enhanced Research Lab system initialized');
    }
});

// Also initialize if DOM is already loaded
if (document.readyState === 'loading') {
    // DOM is still loading
} else {
    // DOM is already loaded
    if (document.getElementById('research-lab') && !window.enhancedResearchLab) {
        window.enhancedResearchLab = new EnhancedResearchLab();
        console.log('Enhanced Research Lab system initialized (DOM already loaded)');
    }
}

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
    module.exports = EnhancedResearchLab;
}