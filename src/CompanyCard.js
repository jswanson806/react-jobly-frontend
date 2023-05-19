import React from "react";
import './CompanyCard.css';

/**
 * CompanyCard Component
 *
 * Renders a card displaying the details of a company, including its name and description.
 *
 * Props:
 * - company: Object containing the company details, including `name` and `description`.
 */

const CompanyCard = ({company}) => {

    return (
        <div className="Company-card" data-testid="Company-card">
            <div className="Company-heading" data-testid="Company-heading">
                <h4 className="Company-title" data-testid="Company-title">{company.name}</h4>
            </div>
            <div className="Company-description" data-testid="Company-description">
                {company.description}
            </div>
        </div>
    );
};

export default CompanyCard;