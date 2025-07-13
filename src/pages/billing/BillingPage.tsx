import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

export default function BillingPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Billing & Usage</h1>
        <p className="text-muted-foreground">
          Manage your subscription and view usage statistics.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            Current Plan
            <Badge variant="secondary">Free</Badge>
          </CardTitle>
          <CardDescription>
            You're currently on the free plan with limited usage.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Image Processing</span>
              <span>15 / 100 used</span>
            </div>
            <Progress value={15} className="h-2" />
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Storage</span>
              <span>2.1 GB / 5 GB used</span>
            </div>
            <Progress value={42} className="h-2" />
          </div>

          <Button className="w-full">Upgrade to Pro</Button>
        </CardContent>
      </Card>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Pro Plan</CardTitle>
            <CardDescription>Perfect for power users</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-3xl font-bold">$19<span className="text-lg font-normal">/month</span></div>
            <ul className="space-y-2 text-sm">
              <li>✓ 1,000 image processing credits</li>
              <li>✓ 50 GB storage</li>
              <li>✓ Priority processing</li>
              <li>✓ Advanced AI models</li>
              <li>✓ API access</li>
            </ul>
            <Button className="w-full">Choose Pro</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Enterprise</CardTitle>
            <CardDescription>For teams and businesses</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-3xl font-bold">$99<span className="text-lg font-normal">/month</span></div>
            <ul className="space-y-2 text-sm">
              <li>✓ Unlimited processing</li>
              <li>✓ 500 GB storage</li>
              <li>✓ Custom models</li>
              <li>✓ Team collaboration</li>
              <li>✓ Priority support</li>
            </ul>
            <Button className="w-full">Contact Sales</Button>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Payment Method</CardTitle>
          <CardDescription>
            Note: Payment processing requires Supabase integration with Stripe.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            Connect your project to Supabase to enable secure payment processing 
            and subscription management through Stripe integration.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}