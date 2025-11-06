import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertTriangle, CheckCircle2, AlertCircle, XCircle } from "lucide-react";

interface FraudAlert {
  id: string;
  alert_type: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  description: string;
  detected_at: string;
  resolved: boolean;
}

interface FraudAlertsProps {
  alerts: FraudAlert[];
}

const severityConfig = {
  low: { icon: CheckCircle2, color: "text-green-500", variant: "default" as const },
  medium: { icon: AlertCircle, color: "text-yellow-500", variant: "default" as const },
  high: { icon: AlertTriangle, color: "text-orange-500", variant: "destructive" as const },
  critical: { icon: XCircle, color: "text-red-500", variant: "destructive" as const },
};

export const FraudAlerts = ({ alerts }: FraudAlertsProps) => {
  const unresolvedAlerts = alerts.filter(a => !a.resolved);

  if (unresolvedAlerts.length === 0) {
    return (
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-green-500" />
            <CardTitle>নিরাপত্তা স্ট্যাটাস (Security Status)</CardTitle>
          </div>
          <CardDescription>সব ঠিক আছে! কোনও সমস্যা সনাক্ত করা হয়নি।</CardDescription>
        </CardHeader>
        <CardContent>
          <Alert>
            <CheckCircle2 className="h-4 w-4" />
            <AlertDescription>
              আপনার অ্যাকাউন্ট এবং কর তথ্য নিরাপদ এবং যাচাইকৃত।
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-2">
          <AlertTriangle className="w-5 h-5 text-orange-500" />
          <CardTitle>নিরাপত্তা সতর্কতা (Security Alerts)</CardTitle>
        </div>
        <CardDescription>
          {unresolvedAlerts.length} টি সমস্যা পর্যালোচনার প্রয়োজন
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        {unresolvedAlerts.map((alert) => {
          const config = severityConfig[alert.severity];
          const Icon = config.icon;

          return (
            <Alert key={alert.id} variant={config.variant}>
              <Icon className={`h-4 w-4 ${config.color}`} />
              <AlertDescription>
                <div className="flex items-start justify-between mb-2">
                  <span className="font-semibold">{alert.alert_type}</span>
                  <Badge variant={config.variant}>{alert.severity}</Badge>
                </div>
                <p className="text-sm">{alert.description}</p>
                <p className="text-xs text-muted-foreground mt-2">
                  সনাক্ত: {new Date(alert.detected_at).toLocaleDateString('bn-BD')}
                </p>
              </AlertDescription>
            </Alert>
          );
        })}
      </CardContent>
    </Card>
  );
};
