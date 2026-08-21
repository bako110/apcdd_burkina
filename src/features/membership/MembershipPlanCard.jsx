import { Check } from 'lucide-react';
import { Card, CardBody, Badge, Button } from '../../components/ui/index.js';
import { cn } from '../../lib/cn.js';

export function MembershipPlanCard({ planKey, plan, cta, highlighted = false, onSelect }) {
  return (
    <Card
      elevated={false}
      interactive
      className={cn(
        'flex h-full flex-col bg-surface-elevated',
        highlighted && 'ring-2 ring-accent-400',
      )}
    >
      <CardBody className="flex flex-1 flex-col">
        {plan.badge && (
          <Badge tone="warning" className="mb-3 self-start">
            {plan.badge}
          </Badge>
        )}
        <h3 className="text-xl font-bold text-primary-body">{plan.name}</h3>
        <p className="mt-2 text-2xl font-extrabold text-primary-600 dark:text-primary-300">
          {plan.price}
        </p>
        <ul className="mt-6 flex-1 space-y-3">
          {plan.benefits.map((benefit) => (
            <li key={benefit} className="flex items-start gap-2 text-sm text-primary-body">
              <Check className="mt-0.5 size-4 shrink-0 text-primary-500" aria-hidden="true" />
              <span>{benefit}</span>
            </li>
          ))}
        </ul>
        <Button
          type="button"
          variant={highlighted ? 'accent' : 'outline'}
          className="mt-8 w-full"
          onClick={() => onSelect(planKey)}
        >
          {cta}
        </Button>
      </CardBody>
    </Card>
  );
}
