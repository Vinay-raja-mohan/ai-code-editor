import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import axios from 'axios';
import { Github, GitBranch, Upload } from 'lucide-react';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

export const GitHubDialog = ({ open, onClose, code, language }) => {
  const [repoPath, setRepoPath] = useState('my-code-project');
  const [repoUrl, setRepoUrl] = useState('');
  const [token, setToken] = useState('');
  const [commitMessage, setCommitMessage] = useState('Update code from Gen-AI IDE');
  const [loading, setLoading] = useState(false);

  const handleGitAction = async (action) => {
    setLoading(true);
    try {
      const response = await axios.post(`${API}/github/action`, {
        action,
        repo_path: repoPath,
        repo_url: repoUrl || undefined,
        commit_message: commitMessage || undefined,
        token: token || undefined
      });

      if (response.data.success) {
        toast.success(response.data.message);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.detail || 'GitHub action failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent data-testid="github-dialog" className="bg-card border-border max-w-md">
        <DialogHeader>
          <DialogTitle className="font-mono text-primary flex items-center gap-2">
            <Github className="h-5 w-5" />
            GitHub Integration
          </DialogTitle>
          <DialogDescription className="text-muted-foreground">
            Push your code to GitHub repository
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          <div>
            <Label className="text-sm font-mono mb-2 block">Repository Name</Label>
            <Input
              data-testid="repo-path-input"
              value={repoPath}
              onChange={(e) => setRepoPath(e.target.value)}
              placeholder="my-code-project"
              className="bg-background border-border font-mono"
            />
          </div>
          
          <div>
            <Label className="text-sm font-mono mb-2 block">Repository URL</Label>
            <Input
              data-testid="repo-url-input"
              value={repoUrl}
              onChange={(e) => setRepoUrl(e.target.value)}
              placeholder="https://github.com/username/repo.git"
              className="bg-background border-border font-mono text-sm"
            />
          </div>
          
          <div>
            <Label className="text-sm font-mono mb-2 block">GitHub Token</Label>
            <Input
              data-testid="github-token-input"
              type="password"
              value={token}
              onChange={(e) => setToken(e.target.value)}
              placeholder="ghp_xxxxxxxxxxxx"
              className="bg-background border-border font-mono text-sm"
            />
          </div>
          
          <div>
            <Label className="text-sm font-mono mb-2 block">Commit Message</Label>
            <Input
              data-testid="commit-message-input"
              value={commitMessage}
              onChange={(e) => setCommitMessage(e.target.value)}
              placeholder="Update code from Gen-AI IDE"
              className="bg-background border-border font-mono"
            />
          </div>
          
          <div className="flex gap-2 pt-4">
            <Button
              data-testid="init-repo-button"
              onClick={() => handleGitAction('init')}
              disabled={loading || !repoPath}
              variant="outline"
              className="flex-1"
            >
              <GitBranch className="h-4 w-4 mr-2" />
              Initialize
            </Button>
            
            <Button
              data-testid="commit-button"
              onClick={() => handleGitAction('commit')}
              disabled={loading || !repoPath || !commitMessage}
              variant="outline"
              className="flex-1"
            >
              Commit
            </Button>
            
            <Button
              data-testid="push-button"
              onClick={() => handleGitAction('push')}
              disabled={loading || !repoPath || !repoUrl || !token}
              className="flex-1 bg-primary hover:bg-primary/90"
            >
              <Upload className="h-4 w-4 mr-2" />
              Push
            </Button>
          </div>
          
          <div className="pt-2 border-t border-border">
            <p className="text-xs text-muted-foreground">
              Generate a GitHub Personal Access Token with 'repo' permissions from your GitHub settings.
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default GitHubDialog;