// Business Mileage Calculator JavaScript

class BusinessMileageCalculator {
    constructor() {
        this.form = document.getElementById('mileageForm');
        this.resultsSection = document.getElementById('resultsSection');
        this.currentData = {};
        
        this.init();
    }

    init() {
        // Set default dates
        this.setDefaultDates();
        
        // Bind event listeners
        this.bindEvents();
        
        // Track tool usage
        Analytics.trackToolUsage('Business Mileage Calculator');
        
        // Load related tools
        RelatedTools.renderRelatedTools(
            'business-mileage-calculator', 
            'mileage-deduction', 
            'relatedTools'
        );
    }

    setDefaultDates() {
        const today = new Date();
        const startOfYear = new Date(today.getFullYear(), 0, 1);
        
        document.getElementById('startDate').value = startOfYear.toISOString().split('T')[0];
        document.getElementById('endDate').value = today.toISOString().split('T')[0];
    }

    bindEvents() {
        // Form submission
        this.form.addEventListener('submit', (e) => {
            e.preventDefault();
            this.calculateDeduction();
        });

        // Real-time calculation on input change
        const milesInput = document.getElementById('totalMiles');
        const reimbursementInput = document.getElementById('reimbursement');
        
        const debouncedCalculate = Utils.debounce(() => {
            if (milesInput.value) {
                this.calculateDeduction();
            }
        }, 500);

        milesInput.addEventListener('input', debouncedCalculate);
        reimbursementInput.addEventListener('input', debouncedCalculate);

        // Export buttons
        document.getElementById('exportPDF').addEventListener('click', () => this.exportPDF());
        document.getElementById('exportExcel').addEventListener('click', () => this.exportExcel());
        document.getElementById('printResults').addEventListener('click', () => this.printResults());
        document.getElementById('emailResults').addEventListener('click', () => this.emailResults());

        // Input validation
        milesInput.addEventListener('blur', () => this.validateMiles());
        reimbursementInput.addEventListener('blur', () => this.validateReimbursement());
    }

    validateMiles() {
        const milesInput = document.getElementById('totalMiles');
        const miles = parseFloat(milesInput.value);
        
        FormValidator.clearError('totalMiles');
        
        if (!milesInput.value) {
            FormValidator.showError('totalMiles', 'Total miles is required');
            return false;
        }
        
        if (!Utils.validateNumber(miles, 0, 100000)) {
            FormValidator.showError('totalMiles', 'Please enter a valid number of miles (0-100,000)');
            return false;
        }
        
        return true;
    }

    validateReimbursement() {
        const reimbursementInput = document.getElementById('reimbursement');
        const reimbursement = parseFloat(reimbursementInput.value) || 0;
        
        FormValidator.clearError('reimbursement');
        
        if (reimbursementInput.value && !Utils.validateNumber(reimbursement, 0, 1000000)) {
            FormValidator.showError('reimbursement', 'Please enter a valid reimbursement amount');
            return false;
        }
        
        return true;
    }

    calculateDeduction() {
        // Validate inputs
        if (!this.validateMiles() || !this.validateReimbursement()) {
            return;
        }

        // Get form data
        const formData = new FormData(this.form);
        const miles = parseFloat(document.getElementById('totalMiles').value) || 0;
        const reimbursement = parseFloat(document.getElementById('reimbursement').value) || 0;
        const businessPurpose = document.getElementById('businessPurpose').value;
        const vehicleType = document.getElementById('vehicleType').value;
        const startDate = document.getElementById('startDate').value;
        const endDate = document.getElementById('endDate').value;
        const notes = document.getElementById('notes').value;

        // Calculate deduction
        const grossDeduction = Utils.calculateMileageDeduction(miles, IRS_RATES_2025.business);
        const netDeduction = Math.max(0, grossDeduction - reimbursement);

        // Store calculation data
        this.currentData = {
            miles,
            reimbursement,
            grossDeduction,
            netDeduction,
            businessPurpose,
            vehicleType,
            startDate,
            endDate,
            notes,
            rate: IRS_RATES_2025.business,
            calculationDate: new Date().toISOString()
        };

        // Update results display
        this.displayResults();

        // Track calculation
        Analytics.trackCalculation('Business Mileage Calculator', {
            miles,
            reimbursement,
            netDeduction
        });
    }

    displayResults() {
        const { miles, reimbursement, grossDeduction, netDeduction } = this.currentData;

        // Update main result values
        document.getElementById('totalDeduction').textContent = Utils.formatCurrency(grossDeduction);
        document.getElementById('netDeduction').textContent = Utils.formatCurrency(netDeduction);

        // Update breakdown
        document.getElementById('breakdownMiles').textContent = Utils.formatNumber(miles);
        document.getElementById('breakdownGross').textContent = Utils.formatCurrency(grossDeduction);
        document.getElementById('breakdownReimbursement').textContent = Utils.formatCurrency(reimbursement);
        document.getElementById('breakdownNet').textContent = Utils.formatCurrency(netDeduction);

        // Calculate tax savings estimates
        this.calculateTaxSavings(netDeduction);

        // Show results section
        this.resultsSection.style.display = 'block';
        this.resultsSection.scrollIntoView({ behavior: 'smooth' });
    }

    calculateTaxSavings(deduction) {
        const savings22 = deduction * 0.22;
        const savings24 = deduction * 0.24;
        const savings32 = deduction * 0.32;

        document.getElementById('savings22').textContent = Utils.formatCurrency(savings22);
        document.getElementById('savings24').textContent = Utils.formatCurrency(savings24);
        document.getElementById('savings32').textContent = Utils.formatCurrency(savings32);
    }

    exportPDF() {
        const { miles, grossDeduction, netDeduction, reimbursement, businessPurpose, vehicleType, startDate, endDate } = this.currentData;
        
        const pdfContent = `
            <div class="result">
                <h3>Business Mileage Calculation Summary</h3>
                <p><strong>Calculation Period:</strong> ${startDate} to ${endDate}</p>
                <p><strong>Business Purpose:</strong> ${businessPurpose}</p>
                <p><strong>Vehicle Type:</strong> ${vehicleType}</p>
                <p><strong>Total Business Miles:</strong> ${Utils.formatNumber(miles)}</p>
                <p><strong>IRS Rate (2025):</strong> $0.70 per mile</p>
                <p><strong>Gross Deduction:</strong> ${Utils.formatCurrency(grossDeduction)}</p>
                <p><strong>Employer Reimbursement:</strong> ${Utils.formatCurrency(reimbursement)}</p>
                <p><strong>Net Tax Deduction:</strong> ${Utils.formatCurrency(netDeduction)}</p>
            </div>
        `;

        PDFExport.generatePDF('Business Mileage Calculator', pdfContent, 'business_mileage_deduction.pdf');
    }

    exportExcel() {
        const { miles, grossDeduction, netDeduction, reimbursement, businessPurpose, vehicleType, startDate, endDate } = this.currentData;
        
        const excelData = [
            ['Business Mileage Deduction Report'],
            ['Generated on', new Date().toLocaleDateString()],
            [''],
            ['Period Start', startDate],
            ['Period End', endDate],
            ['Business Purpose', businessPurpose],
            ['Vehicle Type', vehicleType],
            [''],
            ['Total Business Miles', miles],
            ['IRS Rate (2025)', '$0.70'],
            ['Gross Deduction', Utils.formatCurrency(grossDeduction)],
            ['Employer Reimbursement', Utils.formatCurrency(reimbursement)],
            ['Net Tax Deduction', Utils.formatCurrency(netDeduction)]
        ];

        ExcelExport.generateExcel('Business Mileage Calculator', excelData);
    }

    printResults() {
        window.print();
    }

    emailResults() {
        const subject = encodeURIComponent('Business Mileage Deduction Calculation');
        const body = encodeURIComponent(`
My business mileage deduction calculation:

Total Business Miles: ${Utils.formatNumber(this.currentData.miles)}
Net Tax Deduction: ${Utils.formatCurrency(this.currentData.netDeduction)}

Calculated using IRS Mileage Calculator 2025
        `);
        
        window.location.href = `mailto:?subject=${subject}&body=${body}`;
    }
}

// Initialize calculator when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new BusinessMileageCalculator();
});