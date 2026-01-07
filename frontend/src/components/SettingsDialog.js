import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';

export const SettingsDialog = ({ open, onClose }) => {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent data-testid="settings-dialog" className="bg-card border-border">
        <DialogHeader>
          <DialogTitle className="font-mono text-primary">Settings</DialogTitle>
          <DialogDescription className="text-muted-foreground">
            Configure your coding environment
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-6 py-4">
          <div>
            <Label className="text-sm font-mono mb-2 block">AI Model</Label>
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="font-mono">OpenAI GPT-5.1</Badge>
              <span className="text-xs text-muted-foreground">Using Emergent LLM Key</span>
            </div>
          </div>
          
          <div>
            <Label className="text-sm font-mono mb-2 block">Theme</Label>
            <Badge variant="outline" className="font-mono">Dark Mode (Developer IDE)</Badge>
          </div>
          
          <div>
            <Label className="text-sm font-mono mb-2 block">Editor Font</Label>
            <Badge variant="outline" className="font-mono">Fira Code</Badge>
          </div>
          
          <div>
            <Label className="text-sm font-mono mb-2 block">Features</Label>
            <div className="flex flex-wrap gap-2">
              <Badge className="bg-accent text-accent-foreground">Code Execution</Badge>
              <Badge className="bg-primary text-primary-foreground">AI Generation</Badge>
              <Badge className="bg-secondary text-secondary-foreground">GitHub Integration</Badge>
            </div>
          </div>
          
          <div className="pt-4 border-t border-border">
            <p className="text-xs text-muted-foreground">
              This AI-powered coding environment uses OpenAI GPT-5.1 with sandboxed code execution.
              All code runs in isolated containers for security.
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SettingsDialog;