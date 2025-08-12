import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/accordion/accordion"

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-primary">
            Accordion Component Demo
          </h1>
          <p className="text-muted-foreground text-lg">
            Built with Tailwind CSS v4 and your custom design system
          </p>
        </div>

        {/* Accordion Demo */}
        <div className="max-w-2xl mx-auto space-y-8">
          <div className="bg-card border border-border rounded-lg p-6">
            <h2 className="text-2xl font-semibold text-card-foreground mb-4">
              Frequently Asked Questions
            </h2>
            
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger>Is this component accessible?</AccordionTrigger>
                <AccordionContent>
                  Yes! This accordion component is built with Radix UI primitives, which means it follows WAI-ARIA design patterns and includes proper keyboard navigation, focus management, and screen reader support.
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-2">
                <AccordionTrigger>How does the styling work?</AccordionTrigger>
                <AccordionContent>
                  The component uses your custom Tailwind CSS v4 design system with semantic color tokens like <code className="bg-muted px-1 py-0.5 rounded text-sm">bg-background</code>, <code className="bg-muted px-1 py-0.5 rounded text-sm">text-foreground</code>, and <code className="bg-muted px-1 py-0.5 rounded text-sm">border-border</code> for consistent theming.
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-3">
                <AccordionTrigger>Does it support animations?</AccordionTrigger>
                <AccordionContent>
                  Absolutely! The accordion uses your custom <code className="bg-muted px-1 py-0.5 rounded text-sm">animate-accordion-down</code> and <code className="bg-muted px-1 py-0.5 rounded text-sm">animate-accordion-up</code> animations defined in your Tailwind v4 configuration for smooth expand/collapse transitions.
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-4">
                <AccordionTrigger>Can I customize the appearance?</AccordionTrigger>
                <AccordionContent>
                  Yes! The component accepts className props for all parts (AccordionItem, AccordionTrigger, AccordionContent) and uses the <code className="bg-muted px-1 py-0.5 rounded text-sm">cn()</code> utility function to merge classes properly with your design system.
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-5">
                <AccordionTrigger>What about dark mode support?</AccordionTrigger>
                <AccordionContent>
                  Dark mode is fully supported through your CSS custom properties! The component automatically adapts to light and dark themes using semantic color tokens that change based on the <code className="bg-muted px-1 py-0.5 rounded text-sm">.dark</code> class on the HTML element.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>

          {/* Multiple Accordions Demo */}
          <div className="bg-card border border-border rounded-lg p-6">
            <h2 className="text-2xl font-semibold text-card-foreground mb-4">
              Multiple Selection Example
            </h2>
            
            <Accordion type="multiple" className="w-full">
              <AccordionItem value="feature-1">
                <AccordionTrigger>🎨 Design System Integration</AccordionTrigger>
                <AccordionContent>
                  Seamlessly integrated with your comprehensive design system including primary, secondary, muted, accent, and destructive color variants.
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="feature-2">
                <AccordionTrigger>⚡ Performance Optimized</AccordionTrigger>
                <AccordionContent>
                  Built with React.forwardRef for optimal performance and proper ref forwarding to underlying DOM elements.
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="feature-3">
                <AccordionTrigger>🔧 Highly Customizable</AccordionTrigger>
                <AccordionContent>
                  Every part of the accordion can be customized with additional className props while maintaining the base design system styles.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>

          {/* Color Showcase */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-primary text-primary-foreground p-4 rounded-lg">
              <h3 className="font-semibold">Primary Colors</h3>
              <p className="text-sm opacity-90">bg-primary & text-primary-foreground</p>
            </div>
            <div className="bg-secondary text-secondary-foreground p-4 rounded-lg">
              <h3 className="font-semibold">Secondary Colors</h3>
              <p className="text-sm opacity-90">bg-secondary & text-secondary-foreground</p>
            </div>
            <div className="bg-muted text-muted-foreground p-4 rounded-lg">
              <h3 className="font-semibold">Muted Colors</h3>
              <p className="text-sm opacity-90">bg-muted & text-muted-foreground</p>
            </div>
            <div className="bg-accent text-accent-foreground p-4 rounded-lg">
              <h3 className="font-semibold">Accent Colors</h3>
              <p className="text-sm opacity-90">bg-accent & text-accent-foreground</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
